import React, {useEffect, useState} from "react";
import {showErrorToast} from "@/utils/notify";
import {api} from "@/api/api";
import axios from "axios";
import {ReportAnalysisTypes} from "@/types";

interface OwnProps {
    item: ReportAnalysisTypes;
}

type Props = OwnProps;

const PdfReportViewer: React.FC<Props> = ({item}) => {
    const [pdfUrl, setPdfUrl] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPdf = async () => {
        try {
            const {data} = await axios.get(
                `${api.endpoints.getPdf.get}?reportId=${item.patient_report_id}&analysisId=${item.id}&radiologistId=${item.radiologist_id}`,
                {responseType: "arraybuffer"}
            );
            const url = URL.createObjectURL(new Blob([data], {type: "application/pdf"}));
            setPdfUrl(url);
        } catch (e) {
            showErrorToast("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchPdf();
    }, [item]);


    return (
        <div style={{height: loading ? "400px" : "1200px"}}>
            {loading ? (
                <div style={{textAlign: "center", paddingTop: "20%"}}>
                    <div className="spinner"/>
                    <p style={{color: "#333", marginTop: "16px"}}>We are getting the patient report...</p>
                </div>

            ) : (
                pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        title="PDF Report"
                        style={{width: "100%", height: "100%", border: "none"}}
                    />
                )
            )}
            <style>{`
                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border-left-color: #9c27b0; /* Purple 500 */
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default PdfReportViewer;
