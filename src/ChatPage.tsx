import { useState, useRef, useEffect } from "react";
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

  const [intakeStep, setIntakeStep] = useState<IntakeStep>("none");
  const [intakeData, setIntakeData] = useState<IntakeData>({});
  const [pendingSymptom, setPendingSymptom] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  /* ---------------- EFFECTS ---------------- */

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

  const generateBotResponse = (input: string) => {
    if (isGreeting(input)) {
      return `👋 Hello ${user}! Please tell me your symptom.`;
    }

    const matches = searchHerbsBySymptom(input);

    if (matches.length === 0) {
      return `🤔 I couldn't find a herb for that. Try headache, fever, cough, stomach pain, body ache.`;
    }

    let response = `🌿 **Herbal remedies for your condition:**\n\n`;
    matches.forEach(h => {
      response += `🔹 Scientific Name: ${h.name}\n`;
      response += `🔹 Local Name: ${h.local_name}\n`;
      response += `🔹 Uses: ${h.uses.join(", ")}\n`;
      response += `🔹 How to Use: ${h.notes}\n`;
      response += `🔹 Caution: Use in moderation.\n\n`;
    });

    return response.trim();
  };

  /* ---------------- INTAKE FLOW ---------------- */

  const handleIntakeFlow = (input: string) => {
    switch (intakeStep) {
      case "gender":
        setIntakeData(p => ({ ...p, gender: input }));
        setIntakeStep("age");
        return "How old are you?";

      case "age":
        setIntakeData(p => ({ ...p, age: input }));
        setIntakeStep("duration");
        return "For how long have you been feeling this?";

      case "duration":
        setIntakeData(p => ({ ...p, duration: input }));
        setIntakeStep("bodyPart");
        return "Which part exactly?";

      case "bodyPart": {
        const finalData = { ...intakeData, bodyPart: input };
        setIntakeData(finalData);
        setIntakeStep("done");

        return (
          `🧾 **Details recorded:**\n` +
          `• Gender: ${finalData.gender}\n` +
          `• Age: ${finalData.age}\n` +
          `• Duration: ${finalData.duration}\n` +
          `• Location: ${finalData.bodyPart}\n\n` +
          generateBotResponse(pendingSymptom || "")
        );
      }

      default:
        return "";
    }
  };

  /* ---------------- SEND ---------------- */

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChat(p => [...p, { sender: "user", text: message }]);
    setMessage("");
    setTyping(true);

    setTimeout(() => {
      const reply =
        intakeStep !== "none" && intakeStep !== "done"
          ? handleIntakeFlow(message)
          : (() => {
              setPendingSymptom(message);
              setIntakeData({});
              setIntakeStep("gender");
              return "Before I suggest herbs 🌿, please tell me your **gender**.";
            })();

      setChat(p => [...p, { sender: "bot", text: reply }]);
      setTyping(false);
    }, 700);
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#f0fdf4" }}>
      <header style={{ background: "#16a34a", color: "#fff", padding: "1rem", display: "flex", justifyContent: "space-between" }}>
        <strong>🌿 Herbal Chatbot</strong>
        <button onClick={logout} style={{ background: "#f97316", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
          Logout
        </button>
      </header>

      <main style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
        {chat.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
            background: m.sender === "user" ? "#d1fae5" : "#e0f2fe",
            padding: "0.75rem 1rem",
            borderRadius: "16px",
            marginBottom: "0.5rem",
            maxWidth: "75%",
            whiteSpace: "pre-line"
          }}>
            {m.text}
          </div>
        ))}
        {typing && <em>Typing...</em>}
        <div ref={chatEndRef} />
      </main>

      <form onSubmit={handleSend} style={{ display: "flex", padding: "1rem", gap: "0.5rem" }}>
        <input value={message} onChange={e => setMessage(e.target.value)} style={{ flex: 1, padding: "0.75rem" }} />
        <button type="submit" style={{ background: "#16a34a", color: "#fff", padding: "0 1.5rem", borderRadius: "1rem", border: "none" }}>
          Send
        </button>
      </form>
    </div>
  );
}
