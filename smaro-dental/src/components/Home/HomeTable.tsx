import React, { useState } from "react";
import "./HomeTable.css";
import eyeIcon from "@/assets/svg/eye.svg"
import csvIcon from "@/assets/svg/file-csv.svg"
import squareIcon from "@/assets/svg/square.svg"
import messagingIcon from "@/assets/svg/messages.svg"
import { Link } from "react-router-dom";
import {PatientTypes} from "@/types";
import {strcmp} from "@/utils/utils";
import OhifViewerDialog from "../SmartViewer/OhifViewerDialog";
interface OwnProps {
    list : PatientTypes[]
}

type Props = OwnProps;
const HomeTable: React.FC<Props> = ({list}) => {

    const [dialogViewerOpen, setDialogViewerOpen] = useState(false);
    const [selectedReportAnalysis, setSelectedReportAnalysis] = useState({
        studyId : "",
        patientId:0,
        studyInstanceId:"",
        patientReportId : 0,
        patientReportAnalysisId : 0
    });

    const handleCloseDialog = () => {
        setDialogViewerOpen(false);
    };

    const handleOpenViewerClick = (row:PatientTypes) => {
        setSelectedReportAnalysis({...selectedReportAnalysis, studyId : row.patient_study_id,studyInstanceId: row.patient_study_instance_id,patientId: row.patient_id,patientReportId : row.patient_report_id, patientReportAnalysisId : row.id});
        setDialogViewerOpen(true);
    };


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
                list.map((row: PatientTypes, index) => {
                    return (
                        <TableRow key={index} row={row} index={index} handleOpenViewerClick={handleOpenViewerClick}/>
                    )
                })
            }
            </tbody>
            <OhifViewerDialog
                open={dialogViewerOpen}
                onClose={handleCloseDialog}
                analysis={selectedReportAnalysis}
            />
        </table>
    );
};

export default HomeTable;

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
    "Clinical History",
    "Report",
    "Actions "
]

const TableRow = ({row, index, handleOpenViewerClick}: { row: PatientTypes, index: number, handleOpenViewerClick : (row:PatientTypes) => void }) => {

    return (
        <tr className="h-[67.3px]">
            <td className="px-5 text-[16px] font-extrabold ">{index + 1}</td>
            <td className="px-5">
                <p>{row.patient_name}</p>
                <p className="text-sm text-[#54595E]">{row.id}</p>
            </td>
            <td className="px-5"></td>
            <td className="px-5">
                <p>{new Date(row.inserted_time)?.toLocaleDateString()}</p>
                <p className="text-sm text-[#54595E]">{new Date(row.inserted_time)?.toLocaleTimeString()}</p>
            </td>
            <td className="px-5"><UrgencyLevel priority="high"/></td>
            <td className="px-5">100</td>
            <td className="px-5"><StatusLabel label={strcmp(row.report_status)}/></td>
            <td className="px-5">{<Link to={"/clinical-history"}>
                <button onClick={()=>{
            }} className="bg-[#0D6EFD] rounded-[4px] text-base text-white font-semibold px-4 py-[10px]">
                View
            </button></Link> }</td>
            <td className="px-5 text-[#0D6EFD]">
             <p className="text-sm">Report 1</p>
            </td>
            <td className=" ">
                <div className="flex text-center items-center justify-center gap-x-4">
                    <img className="cursor-pointer" src={eyeIcon} onClick={() => handleOpenViewerClick(row)} alt="action button"/>
                    <img className="cursor-pointer" src={csvIcon} alt="action button"/>
                    <img className="cursor-pointer" src={squareIcon} alt="action button"/>
                    <img className="cursor-pointer" src={messagingIcon} alt="action button"/>
                </div>
            </td>

        </tr>
    );
};



const UrgencyLevel = ({priority}:{priority:string}) => {
    return (
        <div className="flex justify-center items-center w-[4.313rem] h-[1.625rem] rounded" style={{backgroundColor:"#0D6EFD",color:"#FFFFFF",}}>
               <p className="capitalize text-sm font-semibold">{priority}</p>
        </div>
    )
}


const StatusLabel = ({label}:{label:string}) => {
    return (
        <div className="flex px-2 justify-center items-center w-fit h-[1.625rem] rounded" style={{backgroundColor:"#FFF3CD",color:"#664D03"}}>
               <p className="capitalize text-sm font-semibold">{label}</p>
        </div>
    )
}
