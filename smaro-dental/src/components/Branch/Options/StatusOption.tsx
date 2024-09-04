import React from "react";
import chevronDownIcon from "@/assets/svg/chevron-down.svg"


interface Props {
    width?:string;
    onChange:(arg:string)=>void;
    value:string;
    }

  const StatusOption:React.FC<Props> = ({width,value,onChange}) => {
          const status_options= [
              {title:"Active",value:1},
              {title:"In Active",value:0}
          ]
        return (
           <div style={{width:`${width}rem`}} className="border bg-white border-[#DEE2E6] rounded-[6px] flex relative items-center">
             <select
                 style={{WebkitAppearance:"none"}}
                 className="bg-white outline-none w-full text-[#ADB5BD] pl-4 h-[36px] text-sm font-normal rounded-[6px]"
                 onChange={(e)=>onChange?.(e.target.value)}
                 defaultValue={value??""}
             >
            <option value="">Select Status</option>
            {
                status_options.map((item:any,i:number)=>{
                    return  <option key={i} value={item.value}>{item.title}</option>;
                })
            }
          </select>
            <img className="absolute right-0 mr-4" src={chevronDownIcon} alt="" />
           </div>
        )
    }

    export default StatusOption;
