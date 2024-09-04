import React from "react";
import "./DashboardTable.css";
import eyeIcon from "@/assets/svg/eye.svg"
import fileIcon from "@/assets/svg/file-text.svg"
import personIcon from "@/assets/svg/person.svg"
import downloadIcon from "@/assets/svg/download.svg"

const DashboardTable: React.FC = () => {
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
                        <TableRow key={index} row={row} />
                    )
                })
            }
            </tbody>
        </table>
    );
};

export default DashboardTable;

const TableColumn = ({text}: { text: string }) => {
    return (
        <th className="text-[16px] font-extrabold px-10">{text}</th>
    )
}

const ColumnData = [
    "MRN Number",
    "Patient ID",
    "Studies",
    "Study Time",
    "TAT",
    "Priority",
    "Center Name",
    "Status",
    "Action"
]

const TableRow = ({row}: { row: dummyDataType }) => {
    return (
        <tr className="h-[67.3px]">
            <td className="px-10 text-[16px] font-extrabold ">{row.mrnNumber}</td>
            <td className="px-10">{row.patientId}</td>
            <td className="px-10">{row.studies}</td>
            <td className="px-10">
                <p>{row.studyTime.date}</p>
                <p className="text-sm text-[#54595E]">{row.studyTime.time}</p>
            </td>
            <td className="px-10">{row.tat}</td>
            <td className="px-10">{row.priority ? <Label textColor="#055160" label="High" color="#CFF4FC"/> :
                <Label textColor="#055160" label="Low" color="#CFF4FC"/>}</td>
            <td className="px-10">{row.centerName}</td>
            <td className="px-10">{row.status ? <Label textColor="#664D03" label="In Progress" color="#FFF3CD"/> :
                <Label label="Received" textColor="#0A3622" color="#D1E7DD"/>}</td>
            <td className=" ">
                <div className="flex text-center items-center justify-center gap-x-4">
                    <img className="cursor-pointer" src={eyeIcon} alt="action button"/>
                    <img className="cursor-pointer" src={fileIcon} alt="action button"/>
                    <img className="cursor-pointer" src={personIcon} alt="action button"/>
                    <img className="cursor-pointer" src={downloadIcon} alt="action button"/>
                </div>
            </td>
        </tr>
    );
};


const Label = ({label, color, textColor}: { label: string, color: string, textColor?: string }) => {
    return (
        <p style={{backgroundColor: color, color: textColor}}
           className="w-fit h-[26px] text-[14px] font-semibold p-2 flex items-center justify-center rounded-[12px]">
            {label}
        </p>
    )
}

interface dummyDataType {
    mrnNumber: number,
    patientId: string,
    studies: string,
    studyTime: {
        date: string,
        time: string,
    },
    tat: string,
    priority: boolean,
    centerName: string,
    status: boolean
}

type dummyDataTypeArray = dummyDataType[]

const dummyData: dummyDataTypeArray = [
    {
        mrnNumber: 12345,
        patientId: "PID789",
        studies: "CT Abdomen",
        studyTime: {
            date: "2023-12-18",
            time: "10:30 AM"
        },
        tat: "15 Min 23 Sec",
        priority: true,
        centerName: "Hospital A",
        status: false
    },
    {
        mrnNumber: 12345,
        patientId: "PID789",
        studies: "CT Abdomen",
        studyTime: {
            date: "2023-12-18",
            time: "10:30 AM"
        },
        tat: "15 Min 23 Sec",
        priority: false,
        centerName: "Hospital A",
        status: true
    }
];
