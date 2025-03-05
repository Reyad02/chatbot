"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";

const Page = () => {
  const { register, handleSubmit, reset } = useForm<{ question: string }>();
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: { question: string }) => {
    setLoading(true);

    // Add user message to chat history
    const userMessage = { role: "user" as const, content: data.question };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post(
        "https://api.echogpt.live/v1/chat/completions",
        {
          messages: [...messages, userMessage], // Send entire chat history
          model: "EchoGPT",
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_ECHOGPT_API, // Use environment variable
            "Content-Type": "application/json",
          },
        }
      );

      // Extract AI response
      const botMessage = res.data.choices[0]?.message?.content || "No response";

      // Add AI response to chat history
      setMessages((prev) => [...prev, { role: "assistant", content: botMessage }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Error fetching response." }]);
    } finally {
      setLoading(false);
      reset(); // Clear input field
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-4xl mx-auto border h-auto w-lg p-4 flex flex-col space-y-4">
        {/* Chat History */}
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt={msg.role}
                    src={
                      msg.role === "user"
                        ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        : "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                    }
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <div className={`chat-bubble ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex">
          <input
            type="text"
            placeholder="Ask a question..."
            {...register("question", { required: true })}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary ml-2" disabled={loading}>
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
