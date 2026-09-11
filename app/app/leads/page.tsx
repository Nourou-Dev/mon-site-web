"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyAppLeadsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/leads");
  }, [router]);

  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#0060c3] border-t-transparent" />
        <p className="text-sm font-semibold text-[#4b4b4b]">Redirection vers l&apos;espace d&apos;administration...</p>
      </div>
    </div>
  );
}
