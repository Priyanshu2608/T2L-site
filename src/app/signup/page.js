import SignupClient from "@/components/SignupClient";
import { Suspense } from "react";

export const metadata = {
  title: "Create account · Turn2Law",
  description: "Create your Turn2Law account and unlock India's Legal Operating System — Legal Services, Doc Engine, and Introspector.",
};

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>Loading...</div>}>
      <SignupClient />
    </Suspense>
  );
}
