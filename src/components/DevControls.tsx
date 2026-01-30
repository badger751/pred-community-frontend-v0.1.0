import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { devBypass } from "../lib/devBypass";

export default function DevControls() {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const isBypassActive = devBypass.isEnabled;

  const toggleBypass = () => {
    devBypass.toggle();
    window.location.reload();
  };

  // Build-time check: component is completely eliminated in production
  if (import.meta.env.PROD) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        background: isBypassActive ? "#dc2626" : "#1f2937",
        color: "#f3f4f6",
        padding: "8px 12px",
        borderRadius: "8px",
        fontSize: "11px",
        fontFamily: "monospace",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        transition: "all 0.2s ease",
      }}
      onClick={() => setIsVisible(!isVisible)}
      title="Development Controls - Auth bypass only works in dev mode"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: isBypassActive ? "#fbbf24" : "#10b981",
          }}
        />
        DEV {isBypassActive && "🔓"}
      </div>
      
      {isVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            right: "0",
            marginBottom: "8px",
            background: "#111827",
            padding: "12px",
            borderRadius: "6px",
            minWidth: "220px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            whiteSpace: "pre-line",
            lineHeight: "1.4",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ marginBottom: "8px", fontWeight: "bold" }}>Auth Status:</div>
          <div>Hydrated: {isHydrated ? "✓" : "⏳"}</div>
          <div>Auth: {isAuthenticated ? "✓" : "✗"}</div>
          <div>User ID: {user?.id || "none"}</div>
          <div>Role: {user?.roles?.[0] || "none"}</div>
          
          <div style={{ 
            marginTop: "12px", 
            marginBottom: "8px", 
            fontWeight: "bold",
            color: isBypassActive ? "#fbbf24" : "#10b981"
          }}>
            Dev Bypass: {isBypassActive ? "🔓 ON" : "🔒 OFF"}
          </div>
          
          <button
            onClick={toggleBypass}
            style={{
              width: "100%",
              padding: "6px 8px",
              background: isBypassActive ? "#dc2626" : "#059669",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "10px",
              cursor: "pointer",
              marginTop: "4px",
            }}
          >
            {isBypassActive ? "Disable Bypass" : "Enable Bypass"}
          </button>
          
          <div style={{ marginTop: "8px", fontSize: "10px", opacity: 0.7 }}>
            ❌ Never available in production
          </div>
        </div>
      )}
    </div>
  );
}