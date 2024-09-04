import React from "react";
import classNames from "classnames";
import {ConversationTypes} from "@/types";
import {convertDbDateFormat} from "@/utils/date-time";
import userIcon from "@/assets/icons/user.png";
interface ConversationProps {
    onClick: ()=>void;
    selected:ConversationTypes;
    item:ConversationTypes;
}

const Conversation: React.FC<ConversationProps> = ({ selected,item,onClick }) => {

  return (
    <div onClick={onClick}>
        <div className={classNames("flex items-center justify-between gap-x-3  bg-opacity-20 p-3 mb-1 cursor-pointer rounded-2xl",item.id === selected.id && "bg-[#0094FF33]")}>
          <div className="flex items-center gap-x-2 w-full ">
          <img src={userIcon} alt="" className="w-8 h-8" />
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-[13px] font-bold capitalize">{item.agent_name}</h1>
            <h3 className="text-[10px] font-normal ml-4">{item.chat_conversation}</h3>
            </div>
            <p className="text-[10px] capitalize">{convertDbDateFormat(item.inserted_time)}</p>
            <p className="text-[10px] capitalize">Smaro Agent</p>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Conversation;
