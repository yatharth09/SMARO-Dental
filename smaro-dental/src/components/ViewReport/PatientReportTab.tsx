import React, {useEffect, useState} from "react";
import DiagnosisSection from "../SmartViewer/DiagnosisSection";
import {api, AWS_BUCKET_URL} from "@/api/api";
import {showErrorToast, showSuccessToast} from "@/utils/notify";
import LabelHWrap from "../Common/LabelHWrap";
import ReportImages from "@/components/Common/ReportImages";


interface PatientReportTypes {
    report_status: string;
    patient_report_id?: number;
    patient_report_analysis_id?: number;
    clinical_history: string;
    techniques: string;
    findings: string;
    impression: string;
    comments: string;
    radiologist_id: number;
    client_id: number;
    branch_id: number;
    results_type: string;
    patient_name: string;
    dob: any;
    gender: string;
    branch_name: string;
    doctor_name: string;
    radiologist_name: string;
    patient_id: number;
    test_type: string;
    short_code: string;
    test_sub_type: string;
    priority_type: string;
    age: number;
}

const initialValues: PatientReportTypes = {
    dob: "",
    age: 0,
    gender: "",
    patient_name: "",
    clinical_history: "",
    comments: "",
    findings: "",
    impression: "",
    patient_report_analysis_id: 0,
    patient_report_id: 0,
    techniques: "",
    radiologist_id: 0,
    client_id: 0,
    branch_id: 0,
    results_type: "",
    branch_name: "",
    doctor_name: "",
    radiologist_name: "",
    patient_id: 0,
    test_type: "",
    short_code: "",
    test_sub_type: "",
    priority_type: "",
    report_status: "",
}


interface DefaultSectionDataTypes {
    sectionName: string;
    dataName: keyof PatientReportTypes;
    isEditable: boolean;
}

interface AnalysisProps {
    studyId: string;
    studyInstanceId: string;
    patientId: number;
    patientReportId: number;
    patientReportAnalysisId: number
}

interface Props {
    analysis: AnalysisProps;
    selectedTemplate: any;
    templateData: any[]
    resultType: any
    setResultType: any
}

const DataLabel = ({label, value}: { label: string; value: any }) => {
    return <div className="w-full min-w-max">
        <LabelHWrap label={label}>
            <p className="text-black font-bold min-w-max"> - {value}</p>
        </LabelHWrap>
    </div>
}

const PatientReportTab: React.FC<Props> = ({analysis, selectedTemplate, templateData, setResultType, resultType}) => {
    const defaultSections: DefaultSectionDataTypes[] = [
        {sectionName: "Clinical Information", dataName: "clinical_history", isEditable: false},
        {sectionName: "Technique", dataName: "techniques", isEditable: false},
        {sectionName: "Findings", dataName: "findings", isEditable: true},
        {sectionName: "Impressions", dataName: "impression", isEditable: true},
        {sectionName: "Comments", dataName: "comments", isEditable: true},
    ];

    const [patientReport, setPatientReport] = useState<PatientReportTypes>(initialValues);
    const [isDataTrigger, setIsDataTrigger] = useState(false);
    const [updateSectionCount, setUpdateSectionCount] = useState(0);
    const [images, setImages] = useState<string[]>([]);

    const fetchReportImages = async () => {
        try {
            const {data: apiData} = await api.get(`${api.endpoints.reportImages.get}/${analysis.patientReportAnalysisId}`)
            const {data, statusCode} = apiData
            if (statusCode === 200) {
                const _map = data.map((item: { image: string; }) => {
                    return `${AWS_BUCKET_URL}/${item.image}`
                })
                setImages(_map)
            }

        } catch (e) {
            showErrorToast("Something went wrong");
        }
    }

    const createReportImages = async () => {
        const params = images.map(item => {
            return {report_analysis_id: analysis.patientReportAnalysisId, image: item}
        })
        const payload = {reportImages: params}
        try {
            const {data: apiData} = await api.post(api.endpoints.reportImages.create, payload)
            const { statusCode} = apiData

            if (statusCode !== 200) {
               showErrorToast("Something went wrong");
            }

        } catch (e) {
            showErrorToast("Something went wrong,please try again");
        }
    }

    const updatePatientReportAnalysis = async (id: any, _patient_report: PatientReportTypes) => {
        try {
            if (!id) {
                showErrorToast("Report Analysis Is Required");
                return;
            }

            if (!_patient_report.patient_report_id) {
                showErrorToast("Report Id Is Required");
                return;
            }
            const {
                status: apiStatus,
                data: apiData
            } = await api.put(`${api.endpoints.report_analysis.update}/${id}`, _patient_report);
            if (apiStatus === 200) {
                const {statusCode} = apiData;
                if (statusCode === 200) {
                    showSuccessToast("Success! Patient Report Saved");
                    setIsDataTrigger(false);
                    setUpdateSectionCount(0);
                }
            } else {
                showErrorToast("Failure! Patient Report Not Saved");
            }
        } catch (e) {
            showErrorToast("Something went wrong,please try again");
        }
    }

    const onChangeResultType = () => {
        setPatientReport(prevState => ({
            ...prevState,
            results_type: resultType,
        }))
    }

    useEffect(() => {
        if (resultType) {
            onChangeResultType()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultType]);

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
                        setResultType(result.results_type)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        const filter = templateData?.find(item => item.value === selectedTemplate)
        filter && setPatientReport({
            ...patientReport,
            findings: filter.findings,
            impression: filter.impressions,
            comments: filter.comments,
        })
        filter && setResultType(filter.resultType)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTemplate]);

    useEffect(() => {
        // console.log(resultType,"result")
    }, [resultType]);

    useEffect(() => {
        void (async () => {
            await fetchReportImages()
        })()
    }, []);

    useEffect(() => {
        if (analysis.patientReportId)
            getPatientReport(analysis.patientReportId).catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [analysis.patientReportId]);

    useEffect(() => {
        if (analysis.patientReportAnalysisId)
            getPatientReportAnalysis(analysis.patientReportAnalysisId).catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [analysis.patientReportAnalysisId]);

    const updateReportImages = async (data: string[]) => {
        const params = data.map(item => {
            return {report_analysis_id: analysis.patientReportAnalysisId, image: item}
        })
        const payload = {
            report_analysis_id: analysis.patientReportAnalysisId,
            reportImages: params
        }
        try {
            const {data: apiData} = await api.put(api.endpoints.reportImages.update, payload)
            const {statusCode} = apiData;
            if(statusCode !== 200){
                showErrorToast("Something went wrong")
            }
        } catch (e) {
            showErrorToast("Update failed")
        }
    }

    const handleReportImages = async () => {
        if(!images.length){
            await updateReportImages([])
            return
        }

        const flag = images.find(item => item.includes(AWS_BUCKET_URL))
        if (flag) {
            const _map = images.map(item => {
                return item.replace(`${AWS_BUCKET_URL}/`, "")
            })
            await updateReportImages(_map)
            return
        }
        await createReportImages()
    }




    useEffect(() => {
        if (isDataTrigger && updateSectionCount == 3) {
            updatePatientReportAnalysis(analysis.patientReportAnalysisId, patientReport).catch(err => console.log(err));

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateSectionCount]);

    const handleSave = async () => {
        setIsDataTrigger(true);
        await handleReportImages()
    }

    const diagnosisIsChanged = (dataName: string, changedReportText: string) => {
        setPatientReport((prev) => ({
            ...prev,
            [dataName]: changedReportText
        }));
        setUpdateSectionCount(prevCount => prevCount + 1);
    }

    const reportStatusFn = (status: string) => {
        if (status === "Inprocess") {
            return "In Progress"
        }
        return status
    }

    return (
        <div className="w-full p-1 border rounded border-gray-400">
             <div className="w-full border-gray-400 bg-purple-200 p-1">
                   <DataLabel label="Patient Id" value={patientReport?.patient_id} />
                    <DataLabel label="Name" value={patientReport?.patient_name} />
                    {/*<DataLabel label="Age" value={calculateAge(patientReport?.dob)} />*/}
                    <DataLabel label="Gender" value={patientReport?.gender} />
                   <DataLabel label="Diagnostics" value={patientReport?.branch_name} />
                    <DataLabel label="Doctor" value={patientReport?.doctor_name} />
                    <DataLabel label="Radiologist" value={patientReport?.radiologist_name} />
                    <DataLabel label="Modality" value={patientReport?.test_type} />
                    <DataLabel label="Code" value={patientReport?.short_code} />
                    <DataLabel label="Test Type" value={patientReport?.test_sub_type} />
                    <DataLabel label="Priority" value={patientReport?.priority_type} />
                    <DataLabel label="Report Status" value={reportStatusFn(patientReport?.report_status)} />
            </div>


            <div className="w-full my-3 pt-5">
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

            <div className="w-full my-3 pt-5">
                <h1 className="text-black font-bold mb-5">Upload Images</h1>
                <ReportImages initialImages={images} onChange={(_images) => setImages(_images)}/>
            </div>


            <div className="border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
                <button
                    className="bg-[#6C757D] rounded-[4px] text-base font-semibold text-white px-4 py-[10px]">Cancel
                </button>
                <button className="bg-green-700 rounded-[4px] text-base font-semibold text-white px-4 py-[10px]"
                        onClick={() => handleSave()}>Send Report Back
                </button>
            </div>
        </div>
    )

}

export default PatientReportTab;
