import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";




const iconSize = 15

interface ActionProps {
    item:any;
    onPressActionBtn:(action:any,params:any)=>void;
}

const Actions:React.FC<ActionProps> = ({item,onPressActionBtn}) => {
    console.log(item,"item")
    return (
        <div className="flex items-center gap-x-1">
            <button onClick={()=>onPressActionBtn("edit",item)} className="bg-[#0D6EFD] flex items-center justify-center p-1.5 rounded-lg">
                <FaEdit className="fill-white" size={iconSize}/>
            </button>
            <button onClick={()=>onPressActionBtn("delete",item)} className="bg-red-600 flex items-center justify-center p-1.5 rounded-lg">
                <MdOutlineDeleteOutline className="fill-white" size={iconSize}/>
            </button>
        </div>
    )
}

export default Actions;
