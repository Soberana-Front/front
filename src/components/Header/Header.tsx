import { useState } from "react";
// IMPORTANTE:
// ajuste este import para o local onde o AuthContext realmente está no seu projeto.
// Exemplo:
// import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Temporariamente deixe assim enquanto localizamos o AuthContext:
  // const { user } = useAuth();
  // const userName = user?.name ?? "Usuário";

  const userName = "Usuário";

  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      {/* Saudação */}
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          Olá, {userName}
        </h1>
      </div>

      {/* Ações do usuário */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          position: "relative",
        }}
      >
        {/* Notificações */}
        <button
          type="button"
          aria-label="Notificações"
          style={{
            width: "36px",
            height: "36px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        {/* Avatar + Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Menu do usuário"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: 0,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#5b21b6",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {initials}
            </div>

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {isMenuOpen && (
            <div
              style={{
                position: "absolute",
                top: "46px",
                right: 0,
                width: "180px",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                padding: "6px",
                zIndex: 1000,
              }}
            >
              <button
                type="button"
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  padding: "10px 12px",
                  textAlign: "left",
                  cursor: "pointer",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#374151",
                }}
              >
                Perfil
              </button>

              <button
                type="button"
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  padding: "10px 12px",
                  textAlign: "left",
                  cursor: "pointer",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#374151",
                }}
              >
                Configurações
              </button>

              <button
                type="button"
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  padding: "10px 12px",
                  textAlign: "left",
                  cursor: "pointer",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#dc2626",
                }}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}