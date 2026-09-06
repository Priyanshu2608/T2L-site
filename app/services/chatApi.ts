/**
 * Chat API Service Layer for Turn2Law Legal AI Assistant
 * Connects frontend to the lawgpt FastAPI RAG backend service.
 */

export interface QueryRequest {
  query: string;
  model?: string;
}

export interface QueryResponse {
  response: string;
  model_used: string;
}

export interface HealthResponse {
  status: string;
  model?: string;
  rag_enabled?: boolean;
  pinecone_index?: string;
  pinecone_namespace?: string;
  embedding_model?: string;
  queue_size?: number;
}

/**
 * Resolves the backend API base URL from environment variables.
 * Prioritizes VITE_CHAT_API_URL as requested by the specification,
 * falling back to NEXT_PUBLIC_CHAT_API_URL or local default http://localhost:8001.
 */
export function getChatApiUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_CHAT_API_URL ||
    process.env.VITE_CHAT_API_URL;

  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  // Runtime browser fallback: if running on production domain (e.g. vercel.app), use public HTTPS backend
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") {
      return "https://6099fb298af9fded-223-187-113-176.serveousercontent.com";
    }
  }

  return "http://localhost:8002";
}



/**
 * Sends a legal query to the FastAPI RAG backend endpoint (/api/query).
 */
export async function sendLegalQuery(
  query: string,
  model?: string
): Promise<QueryResponse> {
  const baseUrl = getChatApiUrl();
  const endpoint = `${baseUrl}/api/query`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query.trim(),
        model: model || undefined,
      }),
    });

    if (!response.ok) {
      let detailMessage = `Server error (${response.status})`;
      try {
        const errorJson = await response.json();
        if (errorJson?.detail) {
          detailMessage = typeof errorJson.detail === "string"
            ? errorJson.detail
            : JSON.stringify(errorJson.detail);
        }
      } catch {
        // Fallback to HTTP status text if response is not JSON
        detailMessage = response.statusText || detailMessage;
      }
      throw new Error(detailMessage);
    }

    const data: QueryResponse = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        `Unable to connect to Turn2Law backend at ${baseUrl}. Please verify the backend server is running.`
      );
    }
    throw error;
  }
}

/**
 * Checks the status of the FastAPI backend service (/api/health).
 */
export async function checkBackendHealth(): Promise<HealthResponse> {
  const baseUrl = getChatApiUrl();
  const endpoint = `${baseUrl}/api/health`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Health check failed with status ${response.status}`);
  }

  return await response.json();
}
