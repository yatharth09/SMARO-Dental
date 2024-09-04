import React from "react";
import { FaEye } from "react-icons/fa";
import {ConversationTypes} from "@/types";




const iconSize = 15

interface ActionProps {
    item:any;
    onPressActionBtn:(params:ConversationTypes)=>void;
}

const Actions:React.FC<ActionProps> = ({item,onPressActionBtn}) => {
    return (
        <div className="flex items-center gap-x-1">
            <button onClick={()=>onPressActionBtn(item)} className="bg-gray-600 flex items-center justify-center p-1.5 rounded-lg">
                <FaEye className="fill-white" size={iconSize}/>
            </button>
        </div>
    )
}

export default Actions;
