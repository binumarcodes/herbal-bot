import { useState, useEffect } from "react";

type WelcomeProps = {
  goToSignup: () => void;
};

export default function WelcomePage({ goToSignup }: WelcomeProps) {
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

  const headingStyle: React.CSSProperties = {
    fontSize: isMobile ? "1.5rem" : "2rem",
    marginBottom: "0.5rem",
  };

  const textStyle: React.CSSProperties = {
    fontSize: isMobile ? "1rem" : "1.25rem",
    color: "#4b5563",
    marginBottom: "1rem",
  };

  const buttonStyle: React.CSSProperties = {
    padding: isMobile ? "0.6rem 1rem" : "0.75rem 1.5rem",
    fontSize: isMobile ? "0.95rem" : "1rem",
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    width: isMobile ? "80%" : "auto",
    maxWidth: "250px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>👋 Welcome to HerbalBot!</h1>
      <p style={textStyle}>Your personal herbal medicine assistant.</p>
      <button style={buttonStyle} onClick={goToSignup}>
        Get Started
      </button>
    </div>
  );
}
