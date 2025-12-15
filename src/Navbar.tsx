import { useState, useEffect } from "react";

type NavbarProps = {
  user: string;
  loggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
  setShowWelcome: (v: boolean) => void;
};

export default function Navbar({
  user,
  loggedIn,
  setLoggedIn,
  setShowWelcome
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // ✅ SSR-safe
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
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 20
  };

  const navLinks = (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "center",
      gap: "0.75rem"
    }}>
      {!loggedIn ? (
        <button style={buttonStyle} onClick={() => setShowWelcome(false)}>
          Login
        </button>
      ) : (
        <>
          <span>Hi, {user}</span>
          <button
            style={buttonStyle}
            onClick={() => {
              setLoggedIn(false);
              setShowWelcome(true);
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
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer"
            }}
          >
            ☰
          </button>
          {menuOpen && navLinks}
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
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  cursor: "pointer"
};
