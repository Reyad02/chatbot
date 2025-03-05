"use client";
import ChatPage from "@/components/modules/chat/chat";
import { IHistory } from "@/types/history";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleChatPage = () => {
  const { uniqueIdentifier } = useParams();
  const [prevMsgs, setPrevMsgs] = useState<IHistory[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/chat/history/${uniqueIdentifier}`)
      .then(function (response) {
        setPrevMsgs(response.data.data.messages)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [uniqueIdentifier]);
  return <ChatPage />;
};

export default SingleChatPage;
