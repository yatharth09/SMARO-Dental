import {ReportAnalysisTypes} from "@/types";
import {useState} from "react";
import {api} from "@/api/api";
import {notify} from "@/utils/notify";
import {isNum} from "@/utils/utils";
import {useNavigate} from "react-router-dom";


export default function useReportAnalysis() {
    const navigate = useNavigate();
     const [isLoading, setIsLoading] = useState(false);
    const initialValues:ReportAnalysisTypes = {
         branch_name: "",
         client_name: "",
         short_code: "",
         assigned_by: 0,
         comments: "",
         findings: "",
         impression: "",
         address: "",
         client_login_id: 0,
         clinical_history: "",
         clinical_history_count: 0,
         clinical_history_file: "",
         dob: "",
         age: 0,
         doctor_id: 0,
         doctor_name: "",
         estatus: 0,
         gender: "",
         hospital_id: 0,
         id: 0,
         report_analysis_id:0,
         branch_id:0,
         client_id:0,
         inserted_time: "",
         patient_email: "",
         patient_id: 0,
         patient_mobile: "",
         patient_name: "",
         patient_report_id: 0,
         patient_study_id: "",
         patient_study_instance_id: "",
         priority_type: "",
         radiologist_id: 0,
         ref_code: "",
         report_status: "",
         results_type: "",
         techniques: "",
         test_sub_type: "",
         test_sub_type_id: "",
         test_type: "",
         test_type_id: 0
}
      const [reports, setReports] = useState<ReportAnalysisTypes[]>([]);
    const [report,setReport] = useState<ReportAnalysisTypes>(initialValues);


       const [showViewModal,setShowViewModal] = useState(false);

    const [isViewerModalOpen, setIsViewerModalOpen] = useState(false);
    const [selectedReportAnalysis, setSelectedReportAnalysis] = useState({
        studyId: "",
        patientId:0,
        studyInstanceId:"",
        patientReportId: 0,
        patientReportAnalysisId: 0
    });
    const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

        const handleCloseViewer = () => {
        setIsViewerModalOpen(false);
    };

    const handeClosePdfViewer = () => {
        setIsPdfViewerOpen(false);
    };

 const getPatientReportAnalysisPDF = async (id:number) => {
        try {

             const {status:apiStatus,data:apiData} = await api.get(api.endpoints.report_analysis.reportPDF + "/" + id, {});

                if(apiStatus===200)
                {
                     const {statusCode,error,data} = apiData;
                     if(statusCode===200)
                     {
                          if(data===undefined || data===null)
                            {
                                notify("Empty PDF");
                                return;
                            }
                        setReport(data.analysis);
                        setIsPdfViewerOpen(true);
                     }
                     else
                     {
                         notify(error);
                     }

                }
                else
                {
                    notify("Error loading pdf");
                }

        }
        catch (e) {
             notify("Something went wrong, please try again later");
            console.log(e)
        }
    }


    const handleOpenPdfReportViewerClick = async (row: ReportAnalysisTypes) => {

        setSelectedReportAnalysis({...selectedReportAnalysis, studyId: row.patient_study_id, studyInstanceId : row.patient_study_instance_id, patientReportId : row.id, patientReportAnalysisId : row.report_analysis_id});
        if(!isNum(row.report_analysis_id))
        {
           notify("Invalid Id");
           return;
        }
        await getPatientReportAnalysisPDF(row.report_analysis_id);

    };

    const handleOpenViewerClick = (row: ReportAnalysisTypes) => {
        setSelectedReportAnalysis({...selectedReportAnalysis,patientId:row.patient_id, studyId: row.patient_study_id, studyInstanceId : row.patient_study_instance_id, patientReportId : row.id, patientReportAnalysisId : row.report_analysis_id});
        const params = {
            ...selectedReportAnalysis,
            patientId:row.patient_id,
            studyId: row.patient_study_id,
            studyInstanceId : row.patient_study_instance_id,
            patientReportId : row.id,
            patientReportAnalysisId : row.report_analysis_id
        }
        navigate("/patient-report-view",{
            state: {
                analysis: params
            }
        });
        //setIsViewerModalOpen(true);
    };


    const getAnalysisByRadiologistId = async (id:number) => {
         try {
            setIsLoading(true);
        const API_URL = `${api.endpoints.report_analysis.get.radiologist}/${id}`;
        const {status: apiStatus, data: apiData} = await api.get(API_URL, {});
        if (apiStatus === 200) {
            setIsLoading(false);
            const {statusCode, data} = apiData;
            if (statusCode === 200) {
                setReports(data);
            }
        } else {
            setIsLoading(false);
        }
       }
       catch {
          setIsLoading(false);
       }
    }

    const onPressActionButton =  (action:"view"|"report-viewer"|"pdf-viewer",item:ReportAnalysisTypes)=>{

        setReport(item);
       if(action==="view")
        {
            setShowViewModal(true);
        }

        if(action==="report-viewer")
        {
            handleOpenViewerClick(item);
        }
        if(action==="pdf-viewer")
        {
            handleOpenPdfReportViewerClick(item).catch(err=>console.error(err));
        }
    }

     const onClose = (action:"view"|"report-viewer"|"pdf-viewer")=>{
           setReport(initialValues);
         if(action==="view")
        {
            setShowViewModal(false);
        }
          if(action==="report-viewer")
        {
            handleCloseViewer();
        }
         if(action==="pdf-viewer")
        {
            handeClosePdfViewer();
        }
    }

    return {
        isLoading,
        reports,
        selectedReportAnalysis,
         getAnalysisByRadiologistId,
        report,
        showViewModal,
        isViewerModalOpen,
        isPdfViewerOpen,
        onPressActionButton,
        onClose,
    }
}
