import { useState, useEffect } from "react";

type NavbarProps = {
  user: string;
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  setShowWelcome: (value: boolean) => void;
};

export default function Navbar({ user, loggedIn, setLoggedIn, setShowWelcome }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // ✅ SSR-safe window width
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const navStyle: React.CSSProperties = {
    background: "#16a34a",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "0.75rem 1rem" : "1rem 2rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 20,
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
      {!loggedIn ? (
        <button style={buttonStyle} onClick={() => setShowWelcome(false)}>
          Login
        </button>
      ) : (
        <>
          <span style={{ margin: isMobile ? "0.5rem 0" : "0" }}>Hi, {user}</span>
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
        <strong style={{ fontSize: isMobile ? "1rem" : "1.25rem" }}>HerbalBot</strong>
      </div>

      {isMobile ? (
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              border: "none",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
          {navLinks}
        </div>
      ) : (
        <nav>{navLinks}</nav>
      )}
    </header>
  );
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#f97316",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  border: "none",
  cursor: "pointer",
};
