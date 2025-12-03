import { useState } from "react";
import WelcomePage from "./WelcomePage";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import ChatPage from "./ChatPage";
import Dashboard from "./DashboardPage";
import Navbar from "./Navbar";

// Define Page type
type Page = "welcome" | "signup" | "login" | "dashboard" | "chat";

// Define ChatMessage type
export type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("welcome");
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState(""); // store user email
  const [loginTime, setLoginTime] = useState<Date | null>(null); // store login timestamp
  const [chat, setChat] = useState<ChatMessage[]>([]); // ChatMessage array

  // When user logs in successfully
  const setLoggedIn = (username: string, email: string) => {
    setUser(username);
    setUserEmail(email);
    setLoginTime(new Date());
    setCurrentPage("dashboard"); // go to dashboard first
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
          loggedIn={!!user}
          setLoggedIn={(val) => !val && logout()}
          setShowWelcome={(val) => val && setCurrentPage("welcome")}
        />
      )}

      {/* Pages */}
      {currentPage === "welcome" && (
        <WelcomePage goToSignup={() => setCurrentPage("signup")} />
      )}

      {currentPage === "signup" && (
        <SignupPage
          setLoggedIn={() => setLoggedIn(user, userEmail)}
          switchToLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "login" && (
        <LoginPage
          user={user}
          setUser={setUser}
          setLoggedIn={() => setLoggedIn(user, userEmail)}
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
