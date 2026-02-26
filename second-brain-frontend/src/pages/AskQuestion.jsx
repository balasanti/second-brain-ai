import React, { useState, useRef, useEffect } from "react";

function AskQuestion() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = {
      type: "user",
      text: question,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      const aiMessage = {
        type: "ai",
        text: data.answer || "No response from AI",
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "⚠️ Backend connection failed.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-black via-gray-950 to-gray-900 flex flex-col p-6">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        Ask Your AI 🤖
      </h2>

      <div className="flex-1 overflow-y-auto bg-gray-900/50 p-6 rounded-2xl border border-green-500/20 shadow-xl">
        {messages.length === 0 && !loading && (
          <p className="text-gray-400 text-center">
            Start asking questions about your notes...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-md ${
                msg.type === "user"
                  ? "bg-green-500 text-black"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs mt-1 opacity-60">{msg.time}</p>
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-gray-400">AI is typing...</p>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="mt-6 flex gap-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Type your question..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleAsk}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AskQuestion;
