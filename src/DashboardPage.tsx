import { useState, useEffect } from "react";

type DashboardProps = {
  user: string;
  email: string;
  loginTime: Date;
  goToChat: () => void;
  logout: () => void;
};

const symptoms = [
  "Fever", "Cough", "Headache", "Body Ache", "Fatigue",
  "Malaria", "Cold", "Stomach Pain", "Nausea", "Diarrhea",
  "High Blood Pressure", "Insomnia", "Stress", "Anxiety",
  "Respiratory Issues", "Skin Infection", "Inflammation",
  "Joint Pain", "Weak Immune System", "Poor Digestion",
  "Constipation", "Low Energy", "Infection", "Allergy",
  "Chest Pain", "Muscle Pain", "Dizziness", "Menstrual Pain",
  "Indigestion", "Ulcers"
];

export default function DashboardPage({ user, email, loginTime, goToChat, logout }: DashboardProps) {
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #ecfdf5, #f0fdf4)",
        padding: "1.5rem",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ color: "#166534", marginBottom: "0.5rem" }}>
        🌿 HerbalBot Dashboard
      </h1>

      {/* User Info */}
      <div style={{ marginBottom: "1.5rem", color: "#4b5563" }}>
        <p>Welcome back, <strong>{user}</strong> 👋</p>
        <p>Email: <strong>{email}</strong></p>
        <p>Signed in at: <strong>{loginTime.toLocaleString()}</strong></p>
      </div>

      {/* Top Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard title="🌱 Total Herbs" value="10+" />
        <StatCard title="🩺 Symptoms" value="30" />
        <StatCard title="💬 Chats" value="AI Powered" />
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
          gap: "1.5rem",
        }}
      >
        {/* Symptom Selector */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#166534" }}>
            🔍 Find Natural Remedy
          </h2>

          <p style={{ color: "#555", marginBottom: "1rem" }}>
            Choose a symptom and let HerbalBot recommend the best local herbs.
          </p>

          <select
            value={selectedSymptom}
            onChange={(e) => setSelectedSymptom(e.target.value)}
            style={{
              padding: "0.7rem",
              width: "100%",
              borderRadius: "0.5rem",
              border: "1px solid #d1fae5",
              marginBottom: "1rem"
            }}
          >
            <option value="">-- Select Symptom --</option>
            {symptoms.map((symptom, index) => (
              <option key={index} value={symptom}>{symptom}</option>
            ))}
          </select>

          {selectedSymptom && (
            <div
              style={{
                background: "#ecfdf5",
                padding: "1rem",
                borderRadius: "0.6rem",
                border: "1px solid #bbf7d0",
                marginBottom: "1rem",
              }}
            >
              <strong>Selected Symptom:</strong> {selectedSymptom}
            </div>
          )}

          <button
            onClick={goToChat}
            style={{
              padding: "0.7rem 1.3rem",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "0.6rem",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Get Herbal Recommendation 🌿
          </button>
        </div>

        {/* Popular Herbs */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#166534" }}>
            🌿 Popular Nigerian Herbs
          </h2>

          <ul style={{ paddingLeft: "1rem", color: "#444", lineHeight: "1.8" }}>
            <li><strong>Neem</strong> – Malaria, skin infections</li>
            <li><strong>Bitter Leaf</strong> – Fever, digestion</li>
            <li><strong>Scent Leaf</strong> – Cough, cold</li>
            <li><strong>Moringa</strong> – Energy, nutrients</li>
            <li><strong>Ginger</strong> – Pain, inflammation</li>
          </ul>

          <div style={{ marginTop: "1rem", display: "flex", flexDirection: isMobile ? "column" : "row", gap: "0.8rem" }}>
            <button
              onClick={goToChat}
              style={{
                padding: "0.5rem 1rem",
                background: "#15803d",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: "bold",
                width: isMobile ? "100%" : "auto"
              }}
            >
              Open Chat 💬
            </button>

            <button
              onClick={logout}
              style={{
                padding: "0.5rem 1rem",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: "bold",
                width: isMobile ? "100%" : "auto"
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "white",
        padding: "1rem",
        borderRadius: "0.8rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <h4 style={{ marginBottom: "0.5rem", color: "#166534" }}>{title}</h4>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
