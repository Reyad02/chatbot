"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/types/message";
import { BsArrowReturnLeft } from "react-icons/bs";

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
    let identifier = uniqueIdentifier || "";
    if (messages.length > 0) {
      if (messages.length === 1 && !identifier) {
        identifier = uuidv4();
        setUniqueIdentifier(identifier);
      }
      const messagesFullContent = { messages, uniqueIdentifier: identifier };
      axios
        .post(
          "https://chat-bot-backend-chi.vercel.app/api/chat",
          {
            messagesFullContent,
          },
          {
            headers: {
              "Cache-Control": "no-store", 
            },
          }
        )
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const onSubmit = async (data: { question: string }) => {
    setLoading(true);

    const userMessage = { role: "user" as const, content: data.question };
    const updatedMessages = [...messages, userMessage];

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

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botMessage },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error fetching response." },
      ]);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="flex justify-center items-center  h-full">
      <div className=" mx-auto  h-full w-full p-4  flex flex-col space-y-4 min-h-screen ">
        <div className="space-y-2  flex flex-col flex-1">
          {messages.length === 0 ? (
            <div className="  flex flex-1 items-center justify-center ">
              <p className="text-center flex-1 text-lg">{`Hey there! I'm here to help. Ask me anything...`}</p>
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
                  className={`chat-bubble rounded-md relative w-full p-4 ${
                    msg.role === "user"
                      ? "bg-[#3f3c45] text-[#C0BCCA] text-right"
                      : "bg-[#212024] text-[#7E7A86] text-left"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-auto flex ">
          <input
            type="text"
            placeholder="Ask a question..."
            {...register("question", { required: true })}
            className="input input-bordered w-full p-4 bg-transparent"
          />
          <button
            type="submit"
            className="btn bg-[#2B2830] ml-2"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md text-white"></span>
            ) : (
              <BsArrowReturnLeft className="text-lg text-white" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
