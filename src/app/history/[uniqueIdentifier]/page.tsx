"use client";
import ChatPage from "@/components/modules/chat/chat";
import { Message } from "@/types/message";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleChatPage = () => {
  const params = useParams();
  const { uniqueIdentifier } = params;
  const [prevMsgs, setPrevMsgs] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uniqueIdentifier) return;

    setLoading(true);
    axios
      .get(
        `https://chat-bot-backend-chi.vercel.app/api/chat/history/${uniqueIdentifier}`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      )
      .then(function (response) {
        setPrevMsgs(response.data.data.messages);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uniqueIdentifier]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <ChatPage
      initialMessages={prevMsgs}
      initialIdentifier={uniqueIdentifier as string}
    />
  );
};

export default SingleChatPage;
