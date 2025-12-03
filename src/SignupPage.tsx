type SignupProps = {
  setLoggedIn: () => void;
  switchToLogin: () => void;
};

export default function SignupPage({ setLoggedIn, switchToLogin }: SignupProps) {
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

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn();
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#16a34a" }}>Sign Up to HerbalBot</h1>
      <div style={cardStyle}>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleSignup}>
          <div>
            <label style={labelStyle}>Username</label>
            <input type="text" placeholder="Enter your username" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" placeholder="Enter your email" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input type="password" placeholder="Enter your password" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" style={inputStyle} />
          </div>

          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.95rem" }}>
          Already have an account?{" "}
          <span style={{ color: "#16a34a", cursor: "pointer" }} onClick={switchToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
}
