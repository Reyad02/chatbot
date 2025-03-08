"use client";

import { IHistory } from "@/types/history";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const History = () => {
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
          <p className="text-lg">No history found</p>
        </div>
      ) : (
        prevMsgs.map((msg, index) => (
          <Link
            href={`history/${msg.uniqueIdentifier}`}
            key={index}
            className="border border-[#7c7b7f] block mb-4 px-4 py-2 rounded-xl "
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
                className={`chat-bubble rounded-md relative w-full p-4 ${
                  msg.messages[0]?.role === "user"
                    ? "bg-[#3f3c45] text-[#C0BCCA] text-right"
                    : "bg-[#17151B] text-[#7E7A86] text-left"
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
                  className={`chat-bubble rounded-md relative w-full p-4 ${
                    msg.messages[1]?.role === "user"
                      ? "bg-[#2B2830] text-[#C0BCCA] text-right"
                      : "bg-[#212024] text-[#7E7A86] text-left "
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

export default History;
