import React, {
    forwardRef, Fragment,
    KeyboardEventHandler,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import smileIcon from "@/assets/svg/smile.svg";
import uploadIcon from "@/assets/svg/paperclip.svg";
import micIcon from "@/assets/svg/mic.svg";
import dotIcon from "@/assets/svg/more-horizontal.svg";
import userIcon from "@/assets/icons/user.png";
import boatIcon from "@/assets/icons/bot.png";
import { ConversationTypes, MessageTypes } from "@/types";
import {isArray, isStr, isValidUrl} from "@/utils/utils";
import {convertDbDateFormat} from "@/utils/date-time";

import { IoReturnDownBack } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {AWS_BUCKET_URL} from "@/api/api";
import TypingIndicator from "./TypingIndicator";
import classNames from "classnames";

interface ChatProps {
  item: MessageTypes;
  onPressActionBtn: (params:any, conversation: ConversationTypes | null)=>void;
  conversation: ConversationTypes | null;
}

function parseJSON(str:string)
{
    try {
        return JSON.parse(str);

    }catch (e)
    {
        return str;
    }
}

function parseMessage(str:string)
{
   try {
    return JSON.parse(str)?.toString()?.split("\n");
  } catch (error) {
    // Check if it's a simple string (could be improved with regex if needed)
    if (str.trim() !== "") {
      return [str]
    } else {
      return []; // Empty string for other types
    }
  }
}

const getActionTitle = (_msg:string)=>{
    switch (_msg)
    {
        case "upload_image":
            return "Upload Image";
       case "talk_to_human_agent":
            return "Talk To Human Agent";
       case "my_availability":
            return "My Availability";
        default:
            return "";

    }
}

const SenderChat: React.FC<ChatProps> = ({ item }) => {

    const {message, inserted_time,media_url} = item;
  return (
    <div className="w-full flex justify-end mt-4 p-1">
      <div>
        <p className="bg-gray-500 bg-opacity-20 p-2 rounded-tr-[20px] rounded-l-[20px] w-full text-[14px] font-semibold">
          {parseJSON(message)}
        <br/>
             {
                isStr(media_url) && isValidUrl(AWS_BUCKET_URL+"/"+media_url) && <a href={AWS_BUCKET_URL+"/"+media_url} target="_blank"
                                                        className="mt-1 p-1 bg-blue-700 content-center items-center text-center rounded text-xs text-white dark:text-white"
                                                        rel="noreferrer">View File</a>
            }
        </p>

        <h1 className="text-[12px] font-normal mt-1">{convertDbDateFormat(inserted_time)}</h1>
      </div>
    </div>
  );
};

const UserIsTyping: React.FC<{isVisible:boolean}> = ({isVisible}) => {
  return (
    <div className={classNames("w-full flex gap-x-4 mt-4 p-1 transition-opacity duration-500",isVisible ? "opacity-100" : "opacity-0")}>
      <img src={boatIcon} className="w-8 h-8" alt="" />
       <TypingIndicator/>
    </div>
  );
};


const ReceiverChat: React.FC<ChatProps> = ({ item,onPressActionBtn, conversation }) => {
     const {message, inserted_time} = item;

     const messages = parseMessage(message);

     const meta_data = item.meta_data;
     const type = meta_data?.type;
  return (
    <div className="w-full flex gap-x-4 mt-4 p-1 transition-opacity duration-500 opacity-100">
      <div>
          {
              item.type === "bot" ?<img src={boatIcon} className="w-8 h-8" alt="" /> : <img src={userIcon} className="w-8 h-8" alt="" />
          }

      </div>
      <div>
        <h1 className="text-[12px] font-normal">{convertDbDateFormat(inserted_time)}</h1>
        <p className="bg-[#0094FF33] bg-opacity-20 p-3 mt-1 max-w-[50.063rem] rounded-bl-[20px] rounded-r-[20px] w-full text-[14px] font-semibold">
             {
                messages.map((item:any,index:number) => {
                    return <Fragment key={index}><span>{item}</span><br/></Fragment>
               })
            }
             {
                  isArray(type)  && <div className="flex flex-row gap-x-6 mt-4">
                      {
                          type.filter((t: { action: string; })=>t.action!=="skip_response_to_the_user" && isStr(t.action)).map((t: {action:string}, i: number)=>{
                            return <span onClick={()=>onPressActionBtn(t.action, conversation)} className="p-2 bg-purple-500 text-white rounded-[1rem] cursor-pointer" key={i}>{getActionTitle(t.action)}</span>
                          })
                      }
                  </div>
             }
        </p>
      </div>
    </div>
  );
};

interface ChatBoxProps {
  isTyping: boolean;
  messages: MessageTypes[];
  conversation: ConversationTypes;
  sendMessage: (params: { conversation: ConversationTypes; message: string }) => void;
  onPressActionBtn: (params:any)=>void;
}

interface ChatBoxHandle {
  scrollToBottom: () => void;
}

const ChatBox = forwardRef<ChatBoxHandle, ChatBoxProps>(
  ({isTyping, conversation,onPressActionBtn, messages, sendMessage }, ref) => {
      const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      scrollToBottom() {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      },
    }));

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(!isStr(message))
        {
            return;
        }
      if (e.key === "Enter") {
        const params = {
          conversation: conversation,
          message: message,
        };
        sendMessage(params);
        setMessage("");
        if (ref && typeof ref === "object" && ref.current) {
          ref.current.scrollToBottom();
        }
      }
    };

    return (
      <div className="w-full h-[calc(90vh)] relative rounded-r-[12px]">
        <div className="flex items-center justify-start gap-x-3 sticky w-full bg-white top-0 h-10 py-8">
          <div className="relative w-[5%]">
            <img className="w-8 h-8 rounded-full" src={userIcon} alt="" />
            <span className="bottom-0 left-5 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
          <div className="w-[95%] flex flex-row justify-between px-2">
              <h1 className="text-1xl font-bold">{conversation.agent_name}</h1>
              <IoReturnDownBack className="fill-black font-bold" onClick={()=>navigate(-1)} size={22}/>
          </div>
        </div>
        <div
          ref={chatContainerRef}
          className="mt-2 h-[calc(100%-15rem)] overflow-y-auto custom-scrollbar"
        >
          {isArray(messages)?
            messages.map((item, index) => {
              if (item.user_id === conversation.sender_id && item.type !== "bot") {
                return (
                  <SenderChat
                    key={index}
                    item={item}
                    onPressActionBtn={onPressActionBtn}
                    conversation={conversation}
                  />
                );
              } else {
                return (
                  <ReceiverChat
                        key={index}
                        item={item}
                        onPressActionBtn={onPressActionBtn}
                        conversation={conversation}
                      />
                );
              }
            }) :  <ReceiverChat
                    key={Math.random()}
                    item={{
                        id:0,
                        chat_conversation_id:0,
                        user_type:"bot",
                        user_id:0,
                        type:"bot",
                        media_type:"",
                        media_url:"",
                        parent_chat_id:0,
                        estatus:0,
                        message: JSON.stringify("Hi I am Smaro Bot , ask me anything \n I want to upload image or I want to schedule my timing"),
                        inserted_time: new Date(),
                        meta_data: JSON.stringify({})
                    }}
                    onPressActionBtn={onPressActionBtn}
                    conversation={conversation}
                  />}
             <UserIsTyping isVisible={isTyping}/>
        </div>
        <div className="flex items-center justify-between gap-x-4 px-10 absolute bottom-5 left-0 right-0">
          <div className="flex items-center w-full h-[3.063rem] px-5 gap-x-5 bg-[#E9E9E9] rounded-[40px]">
            <img src={smileIcon} alt="" />
            <input
              type="text"
              value={message}
              onKeyDown={handleKeyDown}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full !bg-inherit outline-none"
            />
          </div>
          <img src={micIcon} alt="" className="w-[1.5rem] cursor-pointer" />
          <img src={uploadIcon} alt="" className="w-[1.5rem] cursor-pointer" />
          <img src={dotIcon} alt="" className="w-[1.5rem] cursor-pointer" />
        </div>
      </div>
    );
  }
);

ChatBox.displayName = "ChatBox";

export default ChatBox;
