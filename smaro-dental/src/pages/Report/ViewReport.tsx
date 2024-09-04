import React, {useEffect, useState} from "react";
import ReportTabs from "@/components/ViewReport/ReportTabs";
import {useLocation, useNavigate} from "react-router-dom";
import Layout from "@/shared/Layout";
import {isStr} from "@/utils/utils";
import {api} from "@/api/api";



interface AnalysisProps {
     studyId: string;
     studyInstanceId: string;
     patientId:number;
     patientReportId: number;
     patientReportAnalysisId: number
}

interface ImageProps {
    output_image: string;
    fracture_flag:string;
}

const ViewReport: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading,setIsLoading] = useState(false);
    const [images,setImages] = useState<ImageProps[]>([]);


    const [analysis, setAnalysis] = useState<AnalysisProps>({
        patientId: 0,
        patientReportAnalysisId: 0,
        patientReportId: 0,
        studyId: "",
        studyInstanceId: ""
    });

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



    useEffect(() => {
        if(location.state)
        {
           setAnalysis(location.state.analysis);
        }

    }, [location]);

    return (
        <Layout>
          <div className="mx-8 p-2">
              <div className="w-full mt-2">
                    <div className="flex flex-row w-full justify-end content-center text-right">
                          <button type="button" onClick={()=>navigate(-1)} className="w-[120px] focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Back</button>
                    </div>
                </div>
              <ReportTabs analysis={analysis} images={images} isLoading={isLoading} />
          </div>
        </Layout>
    );
};

export default ViewReport;
