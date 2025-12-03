type LoginProps = {
  user: string;
  setUser: (value: string) => void;
  setLoggedIn: () => void;
  switchToSignup: () => void;
};

export default function LoginPage({ user, setUser, setLoggedIn, switchToSignup }: LoginProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    backgroundColor: "#f3f4f6",
    gap: "1rem",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    minWidth: "350px",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 500,
    color: "#16a34a",
    marginBottom: "0.25rem",
    display: "block",
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.6rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    outline: "none",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.6rem 1rem",
    backgroundColor: "#16a34a",
    color: "white",
    fontWeight: 500,
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim()) setLoggedIn();
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#16a34a" }}>Login to HerbalBot</h1>
      <div style={cardStyle}>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleLogin}>
          <div>
            <label style={labelStyle}>Username</label>
            <input type="text" placeholder="Enter your username" value={user} onChange={(e) => setUser(e.target.value)} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input type="password" placeholder="Enter your password" style={inputStyle} />
          </div>

          <button type="submit" style={buttonStyle}>Login</button>
        </form>

        <p style={{ marginTop: "0.5rem", textAlign: "center", fontSize: "0.95rem" }}>
          Don't have an account?{" "}
          <span style={{ color: "#16a34a", cursor: "pointer" }} onClick={switchToSignup}>Sign Up</span>
        </p>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#555", textAlign: "center" }}>
          Demo Admin: admin | password: admin123
        </p>
      </div>
    </div>
  );
}
