import React from "react";
import "./TableView.css";
import eyeIcon from "@/assets/svg/eye.svg"
import downloadIcon from "@/assets/svg/download.svg";

import Select from "../Common/Select";
import DateRangePicker from "../Common/DateRangePicker";
import TableContainer from "../Table/TableContainer";

interface OwnProps {
 setShowModal: (args:boolean)=>void;
}

type Props = OwnProps;

const TableView: React.FC<Props> = ({setShowModal}) => {
    return (
        <>
             <div className="flex w-full justify-between  items-center px-[31px] gap-6">
            <div style={{boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}}
                 className="px-2 h-full py-4 w-full flex items-start pl-[20px] gap-6 flex-wrap bg-white rounded-[12px] ">
                <DateRangePicker width="15" value={{startDate:"",endDate:""}} setValue={()=>{}}/>
                <Select label="Report Type" width="15" onChange={()=>{}} options={[]}  />
                <Select label="Status" width="15" onChange={()=>{}} options={[]} />
                <Select label="Diagnostics Types" width="15" onChange={()=>{}} options={[]} />
                <Select label="Diagnostics Types " width="15"  onChange={()=>{}} options={[]} />
            </div>
            <button onClick={()=>setShowModal(true)}
                className="text-base font-semibold leading-[18px] w-min h-min px-[1.5rem] py-4 min-w-max text-white rounded-[6px] bg-[#0D6EFD]">
                Add New Upload
            </button>
        </div>


      <div className="px-[1.938rem] mt-3 w-full">
          <TableContainer>
             <table  className="overflow-hidden ">
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
          </TableContainer>
      </div>

        </>
    );
};

export default TableView;

const TableColumn = ({text}: { text: string }) => {
    return (
        <th className="text-[16px] font-extrabold px-5">{text}</th>
    )
}

const ColumnData = [
    "#",
    "File Name",
    "Patient Name",
    "Modality",
    "Upload Date and Time",
    "Uploaded By",
    "Status",
    "Comments/Notes",
    "Actions "
]

const TableRow = ({row, index}: { row: dummyDataType, index: number }) => {
    return (
        <tr className="h-[67.3px]">
            <td className="px-5 text-[16px] font-extrabold ">{index + 1}</td>
            <td className="px-5">{row.fileName}</td>

            <td className="px-5">{row.patientName}</td>
            <td className="px-5">{row.modality}</td>
            <td className="px-5">
                <p>{row.uploadDateTime.date}</p>
                <p className="text-sm text-[#54595E]">{row.uploadDateTime.time}</p>
            </td>
            <td className="px-5">{row.uploadedBy}</td>
            <td className="px-5"><StatusLabel label={row.status}/></td>
            <td className="px-5">{row.comments}</td>
            <td className=" ">
                <div className="flex text-center items-center justify-center gap-x-4">
                    <img className="cursor-pointer" src={eyeIcon}/>
                    <img className="cursor-pointer" src={downloadIcon}/>
                </div>
            </td>
        </tr>
    );
};


const statusConstantsColors:any = {
     Pending:{
        textColor:"#664D03",
        bgColor:"#FFF3CD"
     },
     Completed:{
        textColor:"#0A3622",
        bgColor:"#D1E7DD"
     },
     Reported:{
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
   fileName:string;
   patientName:string;
   modality:string;
   uploadDateTime:{
    date:string;
    time:string;
   };
   uploadedBy:string;
   status:"Pending" | "Completed" | "Reported";
   comments:string;


}

type dummyDataTypeArray = dummyDataType[]

const dummyData: dummyDataTypeArray = [
{
    fileName:"File1.dcm",
    patientName:"Bonnie Barstow",
    modality:"MRI",
    uploadDateTime:{
        date:"Jan 20, 2024",
        time:"12:34 pm"
    },
    uploadedBy:"Thomas Magnum",
    status:"Pending",
    comments:"Patient clasutrophobic, sedation req"
},
{
    fileName:"File1.dcm",
    patientName:"Bonnie Barstow",
    modality:"MRI",
    uploadDateTime:{
        date:"Jan 20, 2024",
        time:"12:34 pm"
    },
    uploadedBy:"Thomas Magnum",
    status:"Completed",
    comments:"Patient clasutrophobic, sedation req"
},
{
    fileName:"File1.dcm",
    patientName:"Bonnie Barstow",
    modality:"MRI",
    uploadDateTime:{
        date:"Jan 20, 2024",
        time:"12:34 pm"
    },
    uploadedBy:"Thomas Magnum",
    status:"Reported",
    comments:"Patient clasutrophobic, sedation req"
}
]
