import { useState, useEffect } from "react";

type SignupProps = {
  setLoggedIn: (username: string, email: string) => void; // updated type
  switchToLogin: () => void;
};

export default function SignupPage({ setLoggedIn, switchToLogin }: SignupProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) return;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoggedIn(username, email); // call parent with username and email
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#16a34a", fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>
        Sign Up to HerbalBot
      </h1>
      <div style={cardStyle}>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleSignup}>
          <div>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)" }}>
          Already have an account?{" "}
          <span style={{ color: "#16a34a", cursor: "pointer" }} onClick={switchToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
}
