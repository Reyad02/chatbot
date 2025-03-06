"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/types/message";

const ChatPage = ({
  initialMessages = [],
  initialIdentifier = "",
}: {
  initialMessages?: Message[];
  initialIdentifier?: string;
}) => {
  const { register, handleSubmit, reset } = useForm<{ question: string }>();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState<boolean>(false);
  const [uniqueIdentifier, setUniqueIdentifier] =
    useState<string>(initialIdentifier);

  useEffect(() => {
    if (messages.length > 0) {
      if (messages.length === 1) {
        setUniqueIdentifier(uuidv4());
      }
      const messagesFullContent = { messages, uniqueIdentifier };
      axios
        .post("http://localhost:5000/api/chat", {
          messagesFullContent,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [messages]);


  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  // console.log(initialMessages, messages);

  // const onSubmit = async (data: { question: string }) => {
  //   setLoading(true);

  //   const userMessage = { role: "user" as const, content: data.question };
  //   const updatedMessages = [...messages, userMessage];
  //   setMessages(updatedMessages);

  //   try {
  //     const res = await axios.post(
  //       "https://api.echogpt.live/v1/chat/completions",
  //       {
  //         // messages: [...messages, userMessage],
  //         messages: updatedMessages,
  //         model: "EchoGPT",
  //       },
  //       {
  //         headers: {
  //           "x-api-key": process.env.NEXT_PUBLIC_ECHOGPT_API,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const botMessage = res.data.choices[0]?.message?.content || "No response";

  //     setMessages((prev) => [
  //       ...prev,
  //       { role: "assistant", content: botMessage },
  //     ]);
  //   } catch (error) {
  //     console.error("Error fetching response:", error);
  //     setMessages((prev) => [
  //       ...prev,
  //       { role: "assistant", content: "Error fetching response." },
  //     ]);
  //   } finally {
  //     setLoading(false);
  //     reset();
  //   }
  // };

  const onSubmit = async (data: { question: string }) => {
    setLoading(true);
  
    const userMessage = { role: "user" as const, content: data.question };
    const updatedMessages = [...messages, userMessage];
  
    console.log("Updated Messages Before Sending:", updatedMessages);
  
    setMessages(updatedMessages);
  
    try {
      const res = await axios.post(
        "https://api.echogpt.live/v1/chat/completions",
        {
          messages: [userMessage],
          model: "EchoGPT",
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_ECHOGPT_API,
            "Content-Type": "application/json",
          },
        }
      );
  
      const botMessage = res.data.choices[0]?.message?.content || "No response";
  
      setMessages((prev) => [...prev, { role: "assistant", content: botMessage }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Error fetching response." }]);
    } finally {
      setLoading(false);
      reset();
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" mx-auto border h-full w-full p-4 flex flex-col space-y-4">
        <div className="space-y-2">
          {messages.length === 0 ? (
            <div className="border h-full flex items-center justify-center">
              <p className="text-center">Ask me anything...</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.role === "user" ? "chat-end" : "chat-start"
                }`}
              >
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
                <div
                  className={`chat-bubble ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-auto flex">
          <input
            type="text"
            placeholder="Ask a question..."
            {...register("question", { required: true })}
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="btn btn-primary ml-2"
            disabled={loading}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
