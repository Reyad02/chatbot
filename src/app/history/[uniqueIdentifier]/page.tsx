"use client";
import ChatPage from "@/components/modules/chat/chat";
import { Message } from "@/types/message";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleChatPage = () => {
  const { uniqueIdentifier } = useParams();
  const [prevMsgs, setPrevMsgs] = useState<Message[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/chat/history/${uniqueIdentifier}`)
      .then(function (response) {
        console.log(response.data.data.messages);
        setPrevMsgs(response.data.data.messages)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [uniqueIdentifier]);
  return <ChatPage initialMessages={prevMsgs} initialIdentifier={uniqueIdentifier as string}  />;
};

export default SingleChatPage;
