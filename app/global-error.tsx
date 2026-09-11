"use client";

export default function RootGlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif", background: "#fbf9f6" }}>
        <main id="contenu" role="alert" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <div style={{ maxWidth: "420px", width: "100%", textAlign: "center", background: "#fff", borderRadius: "1.5rem", border: "1px solid rgba(23,23,23,0.1)", padding: "2.5rem 1.5rem", boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#171717", margin: "0 0 0.75rem 0" }}>
              Une erreur inattendue est survenue
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#4b4b4b", lineHeight: 1.6, margin: "0 0 1.5rem 0" }}>
              Le site a rencontré un imprévu temporaire. Veuillez recharger la page.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              style={{ background: "#0060c3", color: "#fff", border: "none", borderRadius: "9999px", padding: "0.75rem 1.75rem", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer" }}
            >
              Recharger la page
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
