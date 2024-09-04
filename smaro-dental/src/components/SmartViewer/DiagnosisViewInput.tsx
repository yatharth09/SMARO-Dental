import React, {useEffect, useState} from "react";
import DiagnosisSection from "./DiagnosisSection"
import {api} from "@/api/api";
import {notify, showErrorToast} from "@/utils/notify";
import classNames from "classnames";
import ImageSlider from "./ImageSlider";
import {isStr} from "@/utils/utils";
import LabelSelectBox from "../Common/LabelSelectBox";

interface PatientReport {
    patient_report_id?: number;
    patient_report_analysis_id?: number;
    clinical_history: string;
    techniques: string;
    findings: string;
    impression: string;
    comments: string;
    radiologist_id:number;
    client_id:number;
    branch_id:number;
    results_type: string;
}

interface DefaultSectionDataTypes {
    sectionName: string;
    dataName: keyof PatientReport;
    isEditable: boolean;
}

interface DiagnosisViewInputProps {
    analysis: {
      studyId: string;
      patientId:number;
      studyInstanceId: string;
      patientReportId: number;
      patientReportAnalysisId: number
    }
}


const initialValues = {
        clinical_history: "",
        comments: "",
        findings: "",
        impression: "",
        patient_report_analysis_id: 0,
        patient_report_id: 0,
        techniques: "",
        radiologist_id:0,
        client_id:0,
        branch_id:0,
        results_type: "",
    }


const report_result_options = [
    {label:"Select Result Status",value:"",color:"black"},
    {label:"Normal",value:"Normal",color:"black"},
    {label:"Clear",value:"Clear",color:"black"},
    {label:"Abnormal",value:"Abnormal",color:"black"},
];


interface ImageProps {
    output_image: string;
    fracture_flag:string;
}

const  DiagnosisViewInput: React.FC<DiagnosisViewInputProps> = ({analysis})=> {

    const [isLoading,setIsLoading] = useState(false);
    const [images,setImages] = useState<ImageProps[]>([]);

    const [openTab, setOpenTab] = React.useState(1);
    const defaultSections:DefaultSectionDataTypes[] = [
        {sectionName: "Clinical Information", dataName: "clinical_history", isEditable: false},
        {sectionName: "Technique", dataName: "techniques", isEditable: false},
        {sectionName: "Findings", dataName: "findings", isEditable: true},
        {sectionName: "Impressions", dataName: "impression", isEditable: true},
        {sectionName: "Comments", dataName: "comments", isEditable: true}
    ];


    const [patientReport, setPatientReport] = useState<PatientReport>(initialValues);
    const [isDataTrigger, setIsDataTrigger] = useState(false);
    const [updateSectionCount, setUpdateSectionCount] = useState(0);

     const updatePatientReportAnalysis = async (id: any, _patient_report: PatientReport) => {
        try {
              if(!id)
             {
                 showErrorToast("Report Analysis Is Required");
                 return;
             }

             if(!_patient_report.patient_report_id)
             {
                 showErrorToast("Report Id Is Required");
                 return;
             }
            const {status:apiStatus,data:apiData } = await api.put(`${api.endpoints.report_analysis.update}/${id}`, _patient_report);
            if(apiStatus===200)
            {
                const {statusCode} = apiData;
                if(statusCode===200)
                {
                    notify("Success! Patient Report Saved");
                    setIsDataTrigger(false);
                    setUpdateSectionCount(0);
                }
            }
            else
            {
                 notify("Failure! Patient Report Not Saved");
            }
        } catch (e) {
             notify("Something went wrong,please try again");
        }
    }

    const getPatientReport = async (id: any) => {
        try {
            await api.get(`${api.endpoints.report.get}/${id}`, null)
                .then((response) => {
                    if (response.data.data.length > 0) {
                        const result = response.data.data[0];
                        setPatientReport((prevReport: any) => ({
                            ...prevReport,
                            ...result,
                            clinical_history: result.clinical_history,
                            techniques: result.techniques
                        }));
                    }
                })
                .catch(() => {
                    setPatientReport(initialValues);
                });
        } catch (e) {
            console.log(e)
        }
    }

    const getPatientReportAnalysis = async (id: any) => {
        try {
            await api.get(`${api.endpoints.report_analysis.get.id}/${id}`, null)
                .then((response) => {
                    if (response.data.data.length > 0) {
                        const result = response.data.data[0];
                        setPatientReport((prevReport: any) => ({
                            ...prevReport,
                            ...result,
                            clinical_history: result.clinical_history,
                            techniques: result.techniques,
                            findings: result.findings,
                            impression: result.impression,
                            comments: result.comments,
                            radiologist_id: result.radiologist_id
                        }));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (e) {
            console.log(e)
        }
    }

    const onChangeResultType = (option: { value: string; })=>{
         setPatientReport(prevState => ({
             ...prevState,
              results_type: option.value,
         }))
    }


    useEffect(() => {
        if (analysis.patientReportId)
            getPatientReport(analysis.patientReportId).catch(err => console.log(err));
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [analysis.patientReportId]);

    useEffect(() => {
        if (analysis.patientReportAnalysisId)
            getPatientReportAnalysis(analysis.patientReportAnalysisId).catch(err => console.log(err));
    }, [analysis.patientReportAnalysisId]);

    useEffect(() => {
        if (isDataTrigger && updateSectionCount == 3) {
            updatePatientReportAnalysis(analysis.patientReportAnalysisId, patientReport).catch(err => console.log(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateSectionCount]);

    const handleSave = () => {
        setIsDataTrigger(true);
    }

    const diagnosisIsChanged = (dataName: string, changedReportText: string) => {
        setPatientReport((prev)=>({
            ...prev,
            [dataName]: changedReportText
        }));
        setUpdateSectionCount(prevCount => prevCount + 1);
    }

 const getMlAnalysis = async (params: {reportId:number;studyId:string;patientId:number})=>{
        try {
          const headers = {
               "Content-Type": "application/json",
            }
          const data = JSON.stringify({
             "reportid": params.reportId,
             "studyid": params.studyId,
             "patientid":params.patientId,
           });
          setIsLoading(true);
         const {status:apiStatus,data:apiData} = await api.post(api.endpoints.ml.get, data,headers);
        if (apiStatus === 200) {
            setIsLoading(false);
            const {statusCode,data} = apiData;
            if(statusCode===200)
            {
                setImages(data);
            }
        }
        }
        catch (e) {
            setIsLoading(false);
        }
    }

     useEffect(() => {
      if(isStr(analysis?.studyId))
      {
          void (async ()=>{
              const params = {
                  studyId:analysis.studyId,
                  patientId:analysis.patientId,
                  reportId:analysis.patientReportId,
              }
              await getMlAnalysis(params);
          })();
      }
    }, [analysis]);


    return (<div>

        <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a className={classNames("text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer" , openTab === 1 ? "text-white bg-blue-900" : "text-blue-900 bg-white")} onClick={e => {e.preventDefault();setOpenTab(1);}}
                data-toggle="tab"  role="tablist">
                Patient Report
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a className={classNames("text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer" , openTab === 2 ? "text-white bg-blue-900" : "text-blue-900 bg-white")} onClick={e => {e.preventDefault();setOpenTab(2);}} data-toggle="tab" role="tablist">
                 Smaro Predictive Ai Suggestions
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className="text-black font-bold flex justify-center m-4"><h1>Patient Report</h1></div>

                     <div className="mb-3">
                        <LabelSelectBox
                          label="Result"
                          width={250}
                          options={report_result_options}
                          setValue={option=>onChangeResultType(option)}
                          value={patientReport.results_type}
                      />
                    </div>

                    <div>
                        {patientReport && defaultSections.map(section => (
                        <DiagnosisSection
                            key={section.dataName}
                            isEditEnabled={section.isEditable}
                            isDataTrigger={isDataTrigger}
                            diagnosisIsChanged={diagnosisIsChanged}
                            dataName={section.dataName}
                            sectionName={section.sectionName}
                            value={patientReport[section.dataName]}
                        />))}
                    </div>

                    <div className="border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
                        <button className="bg-[#6C757D] rounded-[4px] text-base font-semibold px-4 py-[10px]">Cancel</button>
                        <button className="bg-[#0D6EFD] rounded-[4px] text-base font-semibold px-4 py-[10px]" onClick={() => {
                            handleSave()
                        }}>Save
                        </button>
                    </div>
                </div>
                <div className={classNames(openTab === 2 ? "block" : "hidden")} id="link2">
                  <div className="w-full h-full p-2">
                      <ImageSlider isLoading={isLoading} images={images} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default DiagnosisViewInput;


