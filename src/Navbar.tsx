import { useState, useEffect } from "react";

type NavbarProps = {
  user: string;
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  setShowWelcome: (value: boolean) => void;
};

export default function Navbar({ user, loggedIn, setLoggedIn, setShowWelcome }: NavbarProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const navStyle: React.CSSProperties = {
    backgroundColor: "#16a34a",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "0.75rem 1rem" : "1rem 2rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    position: "relative",
    zIndex: 20,
  };

  const linkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
    fontSize: isMobile ? "0.95rem" : "1rem",
    padding: isMobile ? "0.5rem 0" : undefined,
    marginRight: isMobile ? 0 : "1rem",
  };

  const navLinks = (
    <div
      style={{
        display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
        flexDirection: isMobile ? "column" : "row",
        position: isMobile ? "absolute" : "static",
        top: isMobile ? "100%" : undefined,
        right: isMobile ? 0 : undefined,
        backgroundColor: isMobile ? "#16a34a" : undefined,
        width: isMobile ? "100%" : "auto",
        padding: isMobile ? "1rem" : undefined,
        gap: "0.5rem",
        alignItems: isMobile ? "flex-start" : "center",
      }}
    >
      {/* <a href="#" style={linkStyle} onClick={() => { setShowWelcome(true); setMenuOpen(false); }}>Home</a>
      <a href="#" style={linkStyle} onClick={() => setMenuOpen(false)}>Herbs</a>
      <a href="#" style={linkStyle} onClick={() => setMenuOpen(false)}>Chat</a>
      <a href="#" style={linkStyle} onClick={() => setMenuOpen(false)}>About</a> */}
      {!loggedIn ? (
        <button style={buttonStyle} onClick={() => { setShowWelcome(false); setMenuOpen(false); }}>
          Login
        </button>
      ) : (
        <>
          <span style={{ margin: isMobile ? "0.5rem 0" : "0", fontSize: isMobile ? "0.95rem" : "1rem" }}>
            Hi, {user}
          </span>
          <button
            style={buttonStyle}
            onClick={() => {
              setLoggedIn(false);
              setShowWelcome(true);
              setMenuOpen(false);
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );

  return (
    <header style={navStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>🌿</span>
        <span style={{ fontWeight: "bold", fontSize: isMobile ? "1rem" : "1.25rem" }}>HerbalBot</span>
      </div>

      {isMobile ? (
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
          {navLinks}
        </div>
      ) : (
        <nav style={{ display: "flex", alignItems: "center" }}>
          {navLinks}
        </nav>
      )}
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
  cursor: "pointer",
};
