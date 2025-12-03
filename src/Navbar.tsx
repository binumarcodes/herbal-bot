type NavbarProps = {
  user: string;
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  setShowWelcome: (value: boolean) => void;
};

export default function Navbar({ user, loggedIn, setLoggedIn, setShowWelcome }: NavbarProps) {
  const navStyle: React.CSSProperties = {
    backgroundColor: "#16a34a",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  };

  const linkStyle: React.CSSProperties = { color: "white", marginRight: "1rem", textDecoration: "none" };

  return (
    <header style={navStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>🌿</span>
        <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>HerbalBot</span>
      </div>
      <nav style={{ display: "flex", alignItems: "center" }}>
        <a href="#" style={linkStyle} onClick={() => setShowWelcome(true)}>Home</a>
        <a href="#" style={linkStyle}>Herbs</a>
        <a href="#" style={linkStyle}>Chat</a>
        <a href="#" style={linkStyle}>About</a>
        {!loggedIn ? (
          <button style={buttonStyle} onClick={() => setShowWelcome(false)}>Login</button>
        ) : (
          <>
            <span>Hi, {user}</span>
            <button style={buttonStyle} onClick={() => { setLoggedIn(false); setShowWelcome(true); }}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

const buttonStyle: React.CSSProperties = {
  marginLeft: "1rem",
  backgroundColor: "#f97316",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: "0.375rem",
  border: "none",
  cursor: "pointer"
};
