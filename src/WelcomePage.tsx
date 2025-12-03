type WelcomeProps = {
  goToSignup: () => void;
};

export default function WelcomePage({ goToSignup }: WelcomeProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f3f4f6",
    gap: "1rem"
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "1rem"
  };

  return (
    <div style={containerStyle}>
      <h1>👋 Welcome to HerbalBot!</h1>
      <p>Your personal herbal medicine assistant.</p>
      <button style={buttonStyle} onClick={goToSignup}>Get Started</button>
    </div>
  );
}
