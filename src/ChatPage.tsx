import { useState, useEffect, useRef } from "react";
import herbData from "./data/herbs.json";

type Herb = {
  name: string;
  local_name: string;
  uses: string[];
  notes: string;
};

export type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

type ChatPageProps = {
  user: string;
  chat: ChatMessage[];
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>; // ✅ fixed
  logout: () => void;
};

export default function ChatPage({ user, chat, setChat, logout }: ChatPageProps) {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [chat, typing]);

  const isGreeting = (text: string) => {
    const greetings = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"];
    return greetings.some(g => text.toLowerCase().includes(g));
  };

  const searchHerbsBySymptom = (query: string) => {
    const lower = query.toLowerCase();
    return (herbData as Herb[]).filter(h =>
      h.uses.some(u => lower.includes(u.toLowerCase()) || u.toLowerCase().includes(lower))
    );
  };

  const generateBotResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();

    if (isGreeting(lowerInput)) {
      const replies = [
        `👋 Hello ${user}! How are you feeling today?`,
        `Hi there! 🌿 I can help you with herbs for various ailments.`,
        `Hey! 😊 Tell me what’s bothering you, and I’ll suggest some herbal remedies.`
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }

    const matchedHerbs = searchHerbsBySymptom(userInput);
    if (matchedHerbs.length > 0) {
      let response = `🌿 Based on your symptom, here are some herbal remedies:\n\n`;
      matchedHerbs.forEach(h => {
        response += `🔹 Scientific Name: ${h.name}\n`;
        response += `🔹 Local Nigerian Name: ${h.local_name}\n`;
        response += `🔹 Description / Benefits: ${h.uses.join(", ")}\n`;
        response += `🔹 Side Effects: Use in moderation; consult a doctor if unsure.\n`;
        response += `🔹 How to Use: ${h.notes}\n`;
        response += `🔹 Dosage / Usage: Follow traditional preparation methods, usually as tea, decoction, or soup.\n\n`;
      });
      return response.trim();
    }

    const fallbackReplies = [
      `🤔 I couldn't find a remedy for that symptom. Please type one of: fever, headache, cough, stomach pain, body ache.`,
      `🌿 Hmm, I don't have info on that yet. Try describing your symptom differently.`,
      `🤖 Sorry, I don’t understand. Are you experiencing a symptom like fever, headache, cough, stomach pain, or body ache?`
    ];
    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg: ChatMessage = { sender: "user", text: message };
    setChat(prev => [...prev, userMsg]); // ✅ works now
    setMessage("");
    setTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setChat(prev => [...prev, { sender: "bot", text: botResponse }]);
      setTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#f0fdf4" }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#16a34a",
        color: "white",
        padding: isMobile ? "0.75rem 1rem" : "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        fontSize: isMobile ? "1rem" : "1.2rem"
      }}>
        <span style={{ fontWeight: "bold" }}>🌿 Herbal Chatbot</span>
        <button
          onClick={logout}
          style={{
            background: "#f97316",
            border: "none",
            padding: isMobile ? "0.4rem 0.75rem" : "0.5rem 1rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontWeight: 500,
            color: "white",
            fontSize: isMobile ? "0.85rem" : "1rem"
          }}
        >
          Logout
        </button>
      </header>

      {/* Chat Messages */}
      <main style={{
        flex: 1,
        padding: isMobile ? "0.75rem 1rem" : "1rem 2rem",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "0.5rem" : "0.75rem"
      }}>
        {chat.length === 0 && !typing && (
          <p style={{ color: "#16a34a", fontSize: isMobile ? "0.9rem" : "1rem" }}>
            👋 Hi {user}! You can say hello or type a symptom: fever, headache, cough, stomach pain, body ache.
          </p>
        )}
        {chat.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#d1fae5" : "#e0f2fe",
              padding: isMobile ? "0.5rem 0.75rem" : "0.75rem 1rem",
              borderRadius: "16px",
              maxWidth: isMobile ? "85%" : "70%",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              whiteSpace: "pre-line",
              fontSize: isMobile ? "0.9rem" : "1rem"
            }}
          >
            {msg.text}
          </div>
        ))}
        {typing && (
          <div style={{
            alignSelf: "flex-start",
            backgroundColor: "#e0f2fe",
            padding: isMobile ? "0.5rem 0.75rem" : "0.75rem 1rem",
            borderRadius: "16px",
            maxWidth: isMobile ? "60%" : "40%",
            fontStyle: "italic",
            color: "#555",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            fontSize: isMobile ? "0.85rem" : "0.95rem"
          }}>
            Typing...
          </div>
        )}
        <div ref={chatEndRef}></div>
      </main>

      {/* Input Form */}
      <form onSubmit={handleSend} style={{
        display: "flex",
        padding: isMobile ? "0.5rem 1rem" : "1rem 2rem",
        gap: "0.5rem",
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#ffffff"
      }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your symptom..."
          style={{
            flex: 1,
            padding: isMobile ? "0.6rem 0.8rem" : "0.75rem 1rem",
            borderRadius: "1rem",
            border: "1px solid #cbd5e1",
            fontSize: isMobile ? "0.9rem" : "1rem",
            outline: "none"
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            padding: isMobile ? "0 1rem" : "0 1.5rem",
            borderRadius: "1rem",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: isMobile ? "0.85rem" : "1rem"
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
