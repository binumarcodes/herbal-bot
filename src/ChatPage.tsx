import { useState, useEffect, useRef } from "react";
import herbData from "./data/herbs.json";

/* ---------------- TYPES ---------------- */

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
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  logout: () => void;
};

type IntakeData = {
  gender?: string;
  age?: string;
  duration?: string;
  bodyPart?: string;
};

type IntakeStep = "none" | "gender" | "age" | "duration" | "bodyPart" | "done";

/* ---------------- COMPONENT ---------------- */

export default function ChatPage({ user, chat, setChat, logout }: ChatPageProps) {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [intakeStep, setIntakeStep] = useState<IntakeStep>("none");
  const [intakeData, setIntakeData] = useState<IntakeData>({});
  const [pendingSymptom, setPendingSymptom] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  /* ---------------- HELPERS ---------------- */

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
    if (isGreeting(userInput)) {
      return `👋 Hello ${user}! Please tell me your symptom.`;
    }

    const matchedHerbs = searchHerbsBySymptom(userInput);
    if (matchedHerbs.length > 0) {
      let response = `🌿 **Herbal remedies for your condition:**\n\n`;
      matchedHerbs.forEach(h => {
        response += `🔹 Scientific Name: ${h.name}\n`;
        response += `🔹 Local Name: ${h.local_name}\n`;
        response += `🔹 Uses: ${h.uses.join(", ")}\n`;
        response += `🔹 How to Use: ${h.notes}\n`;
        response += `🔹 Caution: Use in moderation.\n\n`;
      });
      return response.trim();
    }

    return `🤔 I couldn't find a herb for that. Try symptoms like headache, fever, cough, stomach pain, body ache.`;
  };

  /* ---------------- INTAKE FLOW ---------------- */

  const handleIntakeFlow = (input: string) => {
    switch (intakeStep) {
      case "gender":
        setIntakeData(prev => ({ ...prev, gender: input }));
        setIntakeStep("age");
        return "How old are you?";

      case "age":
        setIntakeData(prev => ({ ...prev, age: input }));
        setIntakeStep("duration");
        return "For how long have you been feeling this? (e.g 2 days, 1 week)";

      case "duration":
        setIntakeData(prev => ({ ...prev, duration: input }));
        setIntakeStep("bodyPart");
        return "Which part exactly? (e.g Head – left/right, Stomach – upper/lower)";

      case "bodyPart":
        const finalData = { ...intakeData, bodyPart: input };
        setIntakeData(finalData);
        setIntakeStep("done");

        const herbResponse = generateBotResponse(pendingSymptom || "");

        return (
          `🧾 **Details recorded:**\n` +
          `• Gender: ${finalData.gender}\n` +
          `• Age: ${finalData.age}\n` +
          `• Duration: ${finalData.duration}\n` +
          `• Location: ${finalData.bodyPart}\n\n` +
          herbResponse
        );

      default:
        return "";
    }
  };

  /* ---------------- SEND ---------------- */

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChat(prev => [...prev, { sender: "user", text: message }]);
    setMessage("");
    setTyping(true);

    setTimeout(() => {
      let botReply = "";

      if (intakeStep !== "none" && intakeStep !== "done") {
        botReply = handleIntakeFlow(message);
      } else {
        setPendingSymptom(message);
        setIntakeData({});
        setIntakeStep("gender");
        botReply = "Before I suggest herbs 🌿, please tell me your **gender** (Male / Female).";
      }

      setChat(prev => [...prev, { sender: "bot", text: botReply }]);
      setTyping(false);
    }, 800);
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#f0fdf4" }}>
      {/* Header */}
      <header style={{
        background: "#16a34a",
        color: "#fff",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <strong>🌿 Herbal Chatbot</strong>
        <button onClick={logout} style={{
          background: "#f97316",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          color: "#fff",
          cursor: "pointer"
        }}>
          Logout
        </button>
      </header>

      {/* Messages */}
      <main style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
        {chat.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
            background: msg.sender === "user" ? "#d1fae5" : "#e0f2fe",
            padding: "0.75rem 1rem",
            borderRadius: "16px",
            marginBottom: "0.5rem",
            maxWidth: "75%",
            whiteSpace: "pre-line"
          }}>
            {msg.text}
          </div>
        ))}
        {typing && <em>Typing...</em>}
        <div ref={chatEndRef} />
      </main>

      {/* Input */}
      <form onSubmit={handleSend} style={{ display: "flex", padding: "1rem", gap: "0.5rem" }}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type here..."
          style={{ flex: 1, padding: "0.75rem", borderRadius: "1rem", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{
          background: "#16a34a",
          color: "#fff",
          border: "none",
          padding: "0 1.5rem",
          borderRadius: "1rem"
        }}>
          Send
        </button>
      </form>
    </div>
  );
}
