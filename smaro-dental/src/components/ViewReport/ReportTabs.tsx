import React, {Fragment, useEffect, useState} from "react";
import {RiRobot2Line} from "react-icons/ri";
import {CgFileDocument} from "react-icons/cg";
import {MdViewSidebar} from "react-icons/md";
import PatientReportTab from "./PatientReportTab";
import AIReport from "./AIReport";
import {api, OHIF_SERVER_URL} from "@/api/api";
import classNames from "classnames";
import useAuth from "@/hooks/useAuth";
import LabelSelectBox from "../Common/LabelSelectBox";


const menus = [
    {
        title: "Patient Report",
        icon: <CgFileDocument fontSize={20} className="mr-2"/>,
        description: "Patient Report",
        route: "patient-report",
    },
    {
        title: "AI Predictive Suggestions",
        icon: <RiRobot2Line fontSize={20} className="mr-2"/>,
        description: "Ai Predictive Suggestions",
        route: "ai-predictive-suggestions",
    },

    {
        title: "View Study Report",
        icon: <MdViewSidebar fontSize={20} className="mr-2"/>
        ,
        description: "Report Viewer",
        route: "smart-report-viewer",
    },
]

interface MenuProps {
    title: string;
    icon: any;
    description: string;
    route: string;
}

interface AnalysisProps {
    studyId: string;
    studyInstanceId: string;
    patientId: number;
    patientReportId: number;
    patientReportAnalysisId: number
}

interface ImageProps {
    output_image: string;
    fracture_flag: string;
}

interface Props {
    analysis: AnalysisProps;
    images: ImageProps[];
    isLoading: boolean;
}

const report_result_options = [
    {label: "Select Result Status", value: "", color: "black"},
    {label: "Normal", value: "Normal", color: "black"},
    {label: "Abnormal", value: "Abnormal", color: "black"},]

const ReportTabs: React.FC<Props> = ({analysis, images, isLoading}) => {
    const [menu, setMenu] = useState<MenuProps>({
        title: "",
        icon: <Fragment/>,
        description: "",
        route: "",
    });
    const [templateData, setTemplateData] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState()
    const {user} = useAuth()
    const [resultType, setResultType] = useState()


    const goToMenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: any) => {
        e.preventDefault();
        if (item.route === "smart-report-viewer") {
            const VIEWER_URL = `${OHIF_SERVER_URL}/viewer?StudyInstanceUIDs=${analysis.studyInstanceId}`;
            window.open(VIEWER_URL, "_blank");
            return;
        }
        setMenu(item);
    }


    const getTemplates = async () => {
        try {
            const {data: response, status} = await api.get(`${api.endpoints.template.get_all}/${user.id}`, null)
            const {data} = response

            if (status === 200) {
                console.log(data, "data")
                const filtered = data.map((item: {
                    report_template_name: string;
                    id: number;
                    findings: string;
                    impression: string;
                    comments: string;
                }) => {
                    return {
                        label: item.report_template_name,
                        value: item.id,
                        findings: item.findings,
                        impressions: item.impression,
                        comments: item.comments,
                    }
                })
                setTemplateData(filtered)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        void (
            async () => {
                await getTemplates()
            }
        )()
        setMenu(menus[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="flex flex-col w-[100%] h-full bg-none  wrapper rounded-xl  relative">
            <div className="w-full h-full">
                <div className="w-full h-full md:flex">
                    <ul className="w-[15%] flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                        {
                            menus.map((item, index) => {
                                const styling_classes = item.route === menu.route ? "inline-flex text-[12px] items-center px-4 py-3 text-white  rounded-lg active w-full bg-[#45197f]" : "inline-flex items-center px-4 py-3 rounded-lg  w-full bg-gray-800 hover:bg-gray-700 hover:text-white"
                                return (<li onClick={(e) => goToMenu(e, item)} key={index}>
                                    <a href={`#${item.route}`}
                                       className={classNames("flex flex-row justify-start", styling_classes)}
                                       aria-current="page">
                                        <span className="w-[25%]">
                                           {item.icon}
                                        </span>
                                        <span className="w-[75%]">
                                            {item.title}
                                        </span>


                                    </a>
                                </li>)
                            })
                        }
                    </ul>
                    <div className="w-[85%]  p-6 text-medium text-gray-400 bg-white rounded-lg">
                        <div className="flex flex-row justify-between items-start mb-10">
                            <h3 className="text-lg font-bold text-black mb-2">{menu.title}</h3>
                            {menu.route === "patient-report" &&
                                <div className="flex items-center gap-x-10">
                                    <LabelSelectBox
                                        label="Result"
                                        width={250}
                                        options={report_result_options}
                                        setValue={option => setResultType(option.value)}
                                        value={resultType}
                                    />
                                    <LabelSelectBox label={"Template"} value={selectedTemplate} width={300}
                                                    setValue={(e) => {
                                                        setSelectedTemplate(e.value)
                                                    }} options={templateData}/>
                                </div>
                            }
                        </div>
                        {menu.route === "ai-predictive-suggestions" &&
                            <AIReport images={images} isLoading={isLoading}/>
                        }
                        {menu.route === "patient-report" &&
                            <PatientReportTab resultType={resultType} setResultType={setResultType}
                                              templateData={templateData} selectedTemplate={selectedTemplate}
                                              analysis={analysis}/>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportTabs;

