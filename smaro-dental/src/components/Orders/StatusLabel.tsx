import React from "react";

interface OwnProps {
    status:number;
}

type Props = OwnProps;


const options:any = [
     {textColor:"#664D03", bgColor:"#FFF3CD"},
     {textColor:"#0A3622", bgColor:"#D1E7DD"},
     {textColor:"#58151C", bgColor:"#F8D7DA"}
]
const StatusLabel: React.FC<Props> = ({status}) => {

    let label = "";
    if(status===1)
    {
        label = "Pending";
    }
     if(status===2)
    {
        label = "Completed";
    }
      if(status===3)
    {
        label = "Progress";
    }
  return ( <div className="flex px-2 justify-center items-center w-fit h-[1.625rem] rounded" style={{backgroundColor:options[status].bgColor,color:options[status].textColor}}>
               <p className="capitalize text-sm font-semibold">{label}</p>
        </div>);
};

export default StatusLabel;
