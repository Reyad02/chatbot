"use client";

import { IHistory } from "@/types/history";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HistoryPage = () => {
  const [prevMsgs, setPrevMsgs] = useState<IHistory[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/chat/history")
      .then(function (response) {
        setPrevMsgs(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className=" p-4 min-h-screen flex flex-col ">
      {prevMsgs.length === 0 ? (
        <div className="flex flex-1 items-center justify-center  h-full">
          <p>No history found</p>
        </div>
      ) : (
        prevMsgs.map((msg, index) => (
          <Link
            href={`history/${msg.uniqueIdentifier}`}
            key={index}
            className="border block mb-4 px-4 py-2 rounded-xl "
          >
            <div
              className={`chat ${
                msg.messages[0]?.role === "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt={msg.messages[0]?.role}
                    src={
                      msg.messages[0]?.role === "user"
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
                  msg.messages[0]?.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.messages[0]?.content}
              </div>
            </div>
            <div
              className={`chat  ${
                msg.messages[1]?.role === "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt={msg.messages[1]?.role || "assistant"}
                    src={
                      msg.messages[1]?.role === "user"
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
                  msg.messages[1]?.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.messages[1]?.content}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default HistoryPage;
