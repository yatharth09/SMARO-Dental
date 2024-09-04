import React, { useEffect, useRef, useState } from "react";
import "./messaging.css";
import { io } from "socket.io-client";
import {useLocation} from "react-router-dom";
import Layout from "../shared/Layout";


import useAuth from "../hooks/useAuth";
import { api, SOCKET_SERVER_URL } from "@/api/api";
import {isArray, isNum, isStr} from "@/utils/utils";
import { ConversationTypes, MessageTypes } from "@/types";
import {showErrorToast} from "@/utils/notify";

import ChatBox from "../components/Messaging/ChatBox";
import SearchInput from "../components/Messaging/SearchInput";
import Conversation from "../components/Messaging/Conversation";
import UploadReport from "../components/Messaging/UploadReport";
import SchedulingModal from "../components/Messaging/SchedulingModal";

const Messaging: React.FC = () => {
  const location = useLocation();
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef<{ scrollToBottom: () => void }>(null);
  const { token, user } = useAuth();

  const [showReportUpdateModal, setShowReportUpdateModal] = useState(false);
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);

  const [messages, setMessages] = useState<MessageTypes[]>([]);

  const [selected, setSelected] = useState<ConversationTypes>({
      agent_id: 0,
      agent_name: "",
      chat_category_id: 0,
      chat_conversation: "",
      comments: 0,
      conversation_status: 0,
      estatus: 0,
      id: 0,
      inserted_time: new Date(),
      rating: 0,
      receiver_id: 0,
      receiver_type: "",
      reference_id: 0,
      sender_id: 0,
      sender_name: "",
      sender_type: "",
      updated_time: new Date()
  });
  const [conversations, setConversations] = useState<ConversationTypes[]>([]);
  const [searchUser, setSearchUser] = useState<string>("");

  const handleConversationClick = (item: ConversationTypes) => {
    setSelected(item);
  };

  const getConversations = async (id: number,conversationId:number) => {
    try {
      const { status: apiStatus, data: apiData } = await api.get(api.endpoints.message.conversations + "/" + id, {});
      if (apiStatus === 200) {
        const { statusCode, data } = apiData;
        if (statusCode === 200) {
          const filtered = data.filter((item: { id: number; })=>item.id===conversationId)
          setConversations(filtered);
          if(isArray(filtered))
          {
             setSelected(filtered[0]);
          }
        } else {
          setConversations([]);
        }
      }
    } catch (e) {
      setConversations([]);
    }
  };

  const handleSearch = (value: string) => {
    setSearchUser(value);
    if (value.length === 0) {
      setConversations([]);
    } else {
      setConversations([]);
    }
  };

  interface SendMessageTypes {
    conversation: ConversationTypes;
    message: string;
    media_type?:string;
    media_url?:string
  }

  const sendMessage = (params: SendMessageTypes) => {
    if (!params?.conversation?.id) {
      showErrorToast("Please select conversation to reply first");
      return;
    }

    if (!params?.conversation?.sender_id) {
      showErrorToast("Please select conversation to reply first");
      return;
    }

    try {
      const data = {
        ...params,
        user_id: params.conversation.sender_id,
        user_type: "radiologist",
        type: "user",
        media_type: params?.media_type??"",
        media_url:  params?.media_url??"",
      };
      const socket = io(SOCKET_SERVER_URL);
      socket.emit("send-message", data);
      if(showReportUpdateModal)
      {
        setShowReportUpdateModal(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMessages = async () => {
    try {
      if (!isNum(selected.id)) {
        showErrorToast("Invalid conversation");
        return;
      }
      const { status: apiStatus, data: apiData } = await api.get(api.endpoints.message.get + "/" + selected.id, {});
      if (apiStatus === 200) {
        const { statusCode, data } = apiData;
        if (statusCode === 200) {
          setMessages(data.filter((item: { message: any }) => isStr(item.message)));
          if (chatBoxRef.current) {
            setTimeout(()=>{
                chatBoxRef?.current?.scrollToBottom();
            },100);
          }
        } else {
          setMessages([]);
        }
      }
    } catch (e) {
      setMessages([]);
    }
  };

  const  onPressActionBtn= (action: string,conversation?:ConversationTypes|null)=>{
    if(action==="upload_image")
    {
      setShowReportUpdateModal(true);
    }
    if(action==="my_availability")
    {
      setShowSchedulingModal(true);
    }
    if(action==="talk_to_human_agent") {
      // debugger;
      try {
        const data = {
          ...conversation,
          user_id: conversation&&conversation.sender_id,
          user_type: "radiologist",
          type: "user",
        };
        const socket = io(SOCKET_SERVER_URL);
        socket.emit("user-to-agent-call", data);
      } catch (e) {
        console.log(e);
      }
      console.log(action, conversation);
    }
      
   
  }

  useEffect(() => {
    if (user.id && location?.state?.conversation?.id) {
      void (async () => {
        await getConversations(user.id,location?.state?.conversation?.id);
      })();
    }
  }, [user.id,location?.state?.conversation?.id]);

  useEffect(() => {
    if(!isNum(selected?.id))
    {
      return;
    }
    const socket = io(SOCKET_SERVER_URL, {
      withCredentials: true,
      extraHeaders: { "token": token }
    });

    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("update-chat-list", async () => {
      await fetchMessages();
    });

    socket.on("automated-response-system",  (data) => {
       if(data.action==="started")
       {
         setIsTyping(true);
       }
        if(data.action==="ended")
       {
         setIsTyping(false);
       }
    });

    socket.on("exception-error",data=>{
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token,selected]);

  useEffect(() => {
    if (isNum(selected?.id)) {
      void (async () => {
        await fetchMessages();
      })();
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected.id]);


  return (
    <Layout>
      <div className="p-4 pb-0">
        <div className="flex gap-x-2">
          <div className="rounded-l-[12px] h-[calc(100vh-7rem)] p-2 bg-white relative w-fit">
            <SearchInput value={searchUser} setValue={handleSearch} />
            <div className="mt-4 h-[calc(92vh-7rem)] overflow-y-auto custom-scrollbar pr-2">
              {conversations.map((item, i) => (
                <Conversation key={i} selected={selected} item={item} onClick={() => handleConversationClick(item)} />
              ))}
            </div>
          </div>
          <div className="w-full">
            <ChatBox ref={chatBoxRef} isTyping={isTyping} onPressActionBtn={onPressActionBtn} conversation={selected} messages={messages} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
      {
        showReportUpdateModal && <UploadReport conversation={selected} onSubmit={sendMessage} show={showReportUpdateModal} setShow={setShowReportUpdateModal} />
      }
      {
        showSchedulingModal && < SchedulingModal show={showSchedulingModal} setShow={setShowSchedulingModal} onSubmit={()=>{}}/>
      }
    </Layout>
  );
};

export default Messaging;
