import { useState } from "react";
import WelcomePage from "./WelcomePage";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import ChatPage from "./ChatPage";
import Dashboard from "./DashboardPage";
import Navbar from "./Navbar";

type Page = "welcome" | "signup" | "login" | "dashboard" | "chat";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("welcome");
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState(""); // store user email
  const [loginTime, setLoginTime] = useState<Date | null>(null); // store login timestamp
  const [chat, setChat] = useState<string[]>([]);

  // When user logs in successfully
  const setLoggedIn = (username: string, email: string) => {
    setUser(username);
    setUserEmail(email);
    setLoginTime(new Date());
    setCurrentPage("dashboard"); // now goes to dashboard first
  };

  const logout = () => {
    setUser("");
    setUserEmail("");
    setLoginTime(null);
    setChat([]);
    setCurrentPage("login");
  };

  const showNavbar = currentPage !== "chat"; // hide navbar on chat page

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      {showNavbar && (
        <Navbar
          user={user}
          onLoginClick={() => setCurrentPage("login")}
          onLogoutClick={logout}
        />
      )}

      {/* Pages */}
      {currentPage === "welcome" && (
        <WelcomePage goToSignup={() => setCurrentPage("signup")} />
      )}

      {currentPage === "signup" && (
        <SignupPage
          setLoggedIn={(email: string) => setLoggedIn(user, email)}
          switchToLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "login" && (
        <LoginPage
          user={user}
          setUser={setUser}
          setLoggedIn={(email: string) => setLoggedIn(user, email)}
          switchToSignup={() => setCurrentPage("signup")}
        />
      )}

      {currentPage === "dashboard" && loginTime && (
        <Dashboard
          user={user}
          email={userEmail}
          loginTime={loginTime}
          goToChat={() => setCurrentPage("chat")}
          logout={logout}
        />
      )}

      {currentPage === "chat" && (
        <ChatPage
          user={user}
          chat={chat}
          setChat={setChat}
          logout={logout}
        />
      )}
    </div>
  );
}
