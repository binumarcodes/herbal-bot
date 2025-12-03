import { useState, useEffect } from "react";

type LoginProps = {
  user: string;
  setUser: (value: string) => void;
  setLoggedIn: (username: string, email: string) => void; // updated type
  switchToSignup: () => void;
};

export default function LoginPage({ user, setUser, setLoggedIn, switchToSignup }: LoginProps) {
  const [password, setPassword] = useState(""); // optional, demo purpose
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: isMobile ? "1rem" : "2rem",
    backgroundColor: "#f3f4f6",
    gap: "1rem",
    textAlign: "center",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: isMobile ? "1.5rem" : "2rem",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    width: "100%",
    maxWidth: "400px",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 500,
    color: "#16a34a",
    marginBottom: "0.25rem",
    display: "block",
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
  };

  const inputStyle: React.CSSProperties = {
    padding: isMobile ? "0.6rem 0.8rem" : "0.7rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
    outline: "none",
    width: "100%",
  };

  const buttonStyle: React.CSSProperties = {
    padding: isMobile ? "0.6rem 0.8rem" : "0.7rem 1rem",
    fontSize: "clamp(0.95rem, 2.5vw, 1rem)",
    backgroundColor: "#16a34a",
    color: "white",
    fontWeight: 500,
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
    width: "100%",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim() && password.trim()) {
      // In a real app, verify credentials
      setLoggedIn(user, `${user}@example.com`); // pass username and email
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#16a34a", fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>Login to HerbalBot</h1>
      <div style={cardStyle}>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleLogin}>
          <div>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>Login</button>
        </form>

        <p style={{ marginTop: "0.5rem", textAlign: "center", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)" }}>
          Don't have an account?{" "}
          <span style={{ color: "#16a34a", cursor: "pointer" }} onClick={switchToSignup}>Sign Up</span>
        </p>

        <p style={{ marginTop: "1rem", fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)", color: "#555", textAlign: "center" }}>
          Demo Admin: admin | password: admin123
        </p>
      </div>
    </div>
  );
}
