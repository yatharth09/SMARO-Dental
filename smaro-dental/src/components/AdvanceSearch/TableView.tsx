import React from "react";
import "./TableView.css";
import eyeIcon from "@/assets/svg/eye.svg"
import downloadIcon from "@/assets/svg/download.svg"
const TableView: React.FC = () => {
    return (
        <table  className="overflow-hidden">
            <thead>
            <tr className="h-[68.7px] !bg-white">
                {
                    ColumnData.map((text, index) => {
                        return (
                            <TableColumn text={text} key={index}/>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                dummyData.map((row: dummyDataType, index) => {
                    return (
                        <TableRow key={index} row={row} index={index}/>
                    )
                })
            }
            </tbody>
        </table>
    );
};

export default TableView;

const TableColumn = ({text}: { text: string }) => {
    return (
        <th className="text-[16px] font-extrabold px-5">{text}</th>
    )
}

const ColumnData = [
    "Study ID",
    "Patient Name / ID",
    "Modality",
    "Date/Time",
    "Urgency Level",
    "Cost",
    "Status",
    "Referral Dr",
    "Report",
    "Actions "
]

const TableRow = ({row, index}: { row: dummyDataType, index: number }) => {
    return (
        <tr className="h-[67.3px]">
            <td className="px-5 text-[16px] font-extrabold ">{index + 1}</td>
            <td className="px-5">
                <p>{row.patientNameId.patientName}</p>
                <p className="text-sm text-[#54595E]">{row.patientNameId.id}</p>
            </td>
            <td className="px-5">{row.modality}</td>
            <td className="px-5">
                <p>{row.dateTime.date}</p>
                <p className="text-sm text-[#54595E]">{row.dateTime.time}</p>
            </td>
            <td className="px-5"><UrgencyLevel priority={row.urgencyLevel}/></td>
            <td className="px-5">{`₹ ${row.cost}`}</td>
            <td className="px-5"><StatusLabel label={row.status}/></td>
            <td className="px-5">{row.referralDr}</td>
            <td className="px-5 text-[#0D6EFD] underline">{row.report ? "Report" : ""}</td>
            <td className=" ">
                <div className="flex text-center px-4 gap-x-4">
                    <img className="cursor-pointer" src={eyeIcon} alt="action button"/>
                    <img className="cursor-pointer" src={downloadIcon} alt="action button"/>
                </div>
            </td>
        </tr>
    );
};

const urgencyLevelColors:any = {
    high:{
        textColor:"#343A40",
        bgColor:"#FFC107"
    },
    low:{
        textColor:"#FFFFFF",
        bgColor:"#6C757D"
    },
    medium:{
        textColor:"#FFFFFF",
        bgColor:"#0D6EFD"
    }
}



const UrgencyLevel = ({priority}:{priority:string}) => {
    return (
        <div className="flex justify-center items-center w-[4.313rem] h-[1.625rem] rounded" style={{backgroundColor:urgencyLevelColors[priority].bgColor,color:urgencyLevelColors[priority].textColor}}>
               <p className="capitalize text-sm font-semibold">{priority}</p>
        </div>
    )
}

const statusConstantsColors:any = {
     pending:{
        textColor:"#664D03",
        bgColor:"#FFF3CD"
     },
     completed:{
        textColor:"#0A3622",
        bgColor:"#D1E7DD"
     },
     reported:{
        textColor:"#58151C",
        bgColor:"#F8D7DA"
     }
}


const StatusLabel = ({label}:{label:string}) => {
    return (
        <div className="flex px-2 justify-center items-center w-fit h-[1.625rem] rounded" style={{backgroundColor:statusConstantsColors[label].bgColor,color:statusConstantsColors[label].textColor}}>
               <p className="capitalize text-sm font-semibold">{label}</p>
        </div>
    )
}

interface dummyDataType {
    patientNameId:{
        patientName:string;
        id:number;
    },
    modality:string;
    dateTime:{
        date:string;
        time:string;
    },
    urgencyLevel:"high" | "low" | "medium",
    cost:number;
    status:"pending" | "completed" | "reported",
    referralDr:string;
    report:boolean
}

type dummyDataTypeArray = dummyDataType[]

const dummyData: dummyDataTypeArray = [
  {
     patientNameId:{
        patientName:"Bonnie Barstow",
        id:234958
     },
     modality:"MRI",
     dateTime:{
        date:"Jan 20, 2024",
        time:"12:34 pm"
     },
     urgencyLevel:"high",
     cost:250,
     status:"pending",
     report:false,
     referralDr:"Wille Tanner"
  },
  {
    patientNameId:{
       patientName:"April Curtis",
       id:234958
    },
    modality:"CT",
    dateTime:{
       date:"Jan 20, 2024",
       time:"12:34 pm"
    },
    urgencyLevel:"low",
    cost:250,
    status:"completed",
    report:true,
    referralDr:"Col. Roderick Decker"
 },
 {
    patientNameId:{
       patientName:"Angus MacGyver",
       id:234958
    },
    modality:"X-Ray",
    dateTime:{
       date:"Jan 20, 2024",
       time:"12:34 pm"
    },
    urgencyLevel:"medium",
    cost:250,
    status:"reported",
    report:false,
    referralDr:"Thomas Magnum"
 }
];
