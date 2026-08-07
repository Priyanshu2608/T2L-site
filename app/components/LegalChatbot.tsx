"use client";

import React, { useState, useEffect, useRef } from "react";
import { sendLegalQuery, checkBackendHealth, getChatApiUrl } from "../services/chatApi";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  modelUsed?: string;
  timestamp: string;
  isError?: boolean;
}

const SAMPLE_QUERIES = [
  "What is the punishment for cyber fraud under the IT Act?",
  "Explain IPC Section 420 and its bail conditions.",
  "Is anticipatory bail available under the BNSS?",
  "What are essential terms in a commercial lease under Indian law?",
];

export default function LegalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: "Hello! I am **Turn2Law Legal AI**, grounded in Indian law, statutes, and judicial precedents. Ask me any legal query.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input on open
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [messages, isOpen, isLoading]);

  // Check backend health periodically when open
  useEffect(() => {
    let isMounted = true;

    async function checkHealth() {
      try {
        await checkBackendHealth();
        if (isMounted) setIsBackendOnline(true);
      } catch {
        if (isMounted) setIsBackendOnline(false);
      }
    }

    if (isOpen) {
      checkHealth();
      const interval = setInterval(checkHealth, 30000);
      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }
  }, [isOpen]);

  const handleSend = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryToSend) setInputQuery("");
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const responseData = await sendLegalQuery(text);
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: responseData.response,
        modelUsed: responseData.model_used,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsBackendOnline(true);
    } catch (err: any) {
      const errorText = err.message || "Failed to process legal query.";
      setErrorMessage(errorText);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        sender: "assistant",
        text: `⚠️ **API Error**: ${errorText}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "assistant",
        text: "Conversation cleared. How can I assist you with Indian legal research today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setErrorMessage(null);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-[#0A1628] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:shadow-[0_0_25px_rgba(216,171,91,0.45)] border border-[#D8AB5B]/40 transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Open Turn2Law Legal AI Chatbot"
          >
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D8AB5B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D8AB5B]"></span>
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold tracking-wider text-[#D8AB5B] uppercase font-[var(--font-poppins)]">
                Turn2Law AI
              </span>
              <span className="text-sm font-medium text-gray-200">Legal Assistant</span>
            </div>
            <svg
              className="w-5 h-5 ml-1 text-[#D8AB5B] transition-transform duration-300 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] max-h-[85vh] h-[640px] bg-[#0A1628] border border-[#D8AB5B]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#0E1D33] px-5 py-4 border-b border-[#D8AB5B]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D8AB5B] to-[#B98F42] flex items-center justify-center text-black font-bold text-lg shadow-md">
                ⚖️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white text-base font-semibold font-[var(--font-poppins)] tracking-tight">
                    Turn2Law Legal AI
                  </h3>
                  {isBackendOnline !== null && (
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isBackendOnline
                          ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-950/80 text-amber-400 border-amber-500/30"
                      }`}
                      title={
                        isBackendOnline
                          ? "FastAPI RAG Backend Connected"
                          : `Backend Offline (${getChatApiUrl()})`
                      }
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isBackendOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                        }`}
                      />
                      {isBackendOnline ? "RAG Online" : "Check Backend"}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 font-sans">
                  Grounded in Indian Law & Precedents
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 text-gray-400 hover:text-[#D8AB5B] hover:bg-white/5 rounded-lg transition-colors"
                title="Clear Chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Close Chat"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0A1628]/95 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#D8AB5B] text-black font-medium rounded-br-xs shadow-md"
                      : msg.isError
                      ? "bg-red-950/60 border border-red-500/40 text-red-200 rounded-bl-xs"
                      : "bg-[#0E1D33] text-gray-200 border border-white/10 rounded-bl-xs shadow-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans break-words">
                    {msg.text}
                  </div>

                  {msg.modelUsed && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                      <span>Model: {msg.modelUsed}</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-[#D8AB5B] transition-colors ml-2"
                      >
                        {copiedId === msg.id ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-gray-500 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="bg-[#0E1D33] border border-[#D8AB5B]/30 rounded-2xl rounded-bl-xs px-4 py-3 text-sm text-gray-300 shadow-sm flex items-center gap-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#D8AB5B] animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-[#D8AB5B] animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#D8AB5B] animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                  <span className="text-xs text-[#D8AB5B] font-mono animate-pulse">
                    Searching Indian legal database & generating response...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Suggestions */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-4 py-2.5 bg-[#0E1D33]/60 border-t border-white/5">
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-mono mb-2">
                Suggested Legal Topics:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_QUERIES.map((sq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(sq)}
                    className="text-xs bg-white/5 hover:bg-[#D8AB5B]/15 hover:border-[#D8AB5B]/40 text-gray-300 hover:text-[#D8AB5B] px-2.5 py-1 rounded-lg border border-white/10 transition-all text-left"
                  >
                    {sq}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && !isLoading && (
            <div className="px-4 py-2 bg-red-950/80 border-t border-red-500/30 flex items-center justify-between text-xs text-red-300">
              <span className="truncate mr-2">API Error encountered</span>
              <button
                onClick={() => handleSend()}
                className="underline hover:text-white font-medium shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-[#0E1D33] border-t border-[#D8AB5B]/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={textareaRef}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your legal question... (Press Enter to send)"
                rows={2}
                disabled={isLoading}
                className="flex-1 bg-[#0A1628] text-white text-sm placeholder-gray-500 rounded-xl px-3.5 py-2.5 border border-white/10 focus:border-[#D8AB5B] focus:outline-none focus:ring-1 focus:ring-[#D8AB5B] resize-none transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="bg-gradient-to-r from-[#D8AB5B] to-[#B98F42] hover:from-[#B98F42] hover:to-[#D8AB5B] text-black font-semibold p-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md flex items-center justify-center shrink-0"
                aria-label="Send Query"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-gray-500 font-mono">
              <span>Press Shift+Enter for newline</span>
              <span>Turn2Law RAG v1.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
