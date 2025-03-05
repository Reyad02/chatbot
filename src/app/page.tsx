"use client"
import { useState, useEffect } from "react";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");

    // Placeholder for API integration (EchoGPT)
    setTimeout(() => {
      const botReply = { text: "This is a bot response.", sender: "bot" };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Chat</h2>
        <div className="h-60 overflow-y-auto border p-2 rounded">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-200"}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="mt-2 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="Type a message..."
          />
          <button onClick={handleSend} className="ml-2 bg-blue-500 text-white p-2 rounded">Send</button>
        </div>
      </div>
    </div>
  );
}