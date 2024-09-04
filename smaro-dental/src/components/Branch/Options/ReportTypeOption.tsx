import React from "react";
import chevronDownIcon from "@/assets/svg/chevron-down.svg"

interface Props {
     width?:string;
     onChange:(arg:string)=>void;
     value:string;
}

  const ReportTypeOption:React.FC<Props> = ({width,value,onChange}) => {

        return (
           <div style={{width:`${width}rem`}} className="border bg-white border-[#DEE2E6] rounded-[6px] flex relative items-center">
             <select
                 style={{WebkitAppearance:"none"}}
                 className="bg-white outline-none w-full text-[#ADB5BD] pl-4 h-[36px] text-sm font-normal rounded-[6px]"
                 onChange={(e)=>onChange?.(e.target.value)}
                 defaultValue={value??""}
             >
            <option value="">Select Equipment Type</option>
          </select>
            <img className="absolute right-0 mr-4" src={chevronDownIcon} alt="" />
           </div>
        )
    }

    export default ReportTypeOption;
