import React, {useEffect, useState} from "react"

import * as Yup from "yup";
import {FormikValues, useFormik} from "formik";
import {ProfileTypes} from "@/types";
import CustomFileUpload from "@/components/Common/CustomFileUpload";
import LabelSelectBox from "@/components/Common/LabelSelectBox";
import {api} from "@/api/api";

interface OwnProps {
    radiologist:ProfileTypes
    onSubmit:(params:ProfileTypes|FormikValues)=>unknown;
}
type Props = OwnProps;

const validationSchema = Yup.object().shape({
   medical_degree_file: Yup.string().optional().label("Medical Degree"),
   board_cert_file:Yup.string().optional().label("Board certifications"),
});


const  EditQualificationTab:React.FC<Props> = ({radiologist,onSubmit}: Props)=> {
const [medicalColleges ,setMedicalColleges] = useState<any[]>([]);
const [medicalCouncils ,setMedicalCouncils] = useState<any[]>([]);
const [medicalDegrees ,setMedicalDegrees] = useState<any[]>([]);
    const initialValues  = {
        medical_degree_file: "",
        board_cert_file: "",
        medical_council_id:0,
        medical_college_id:0,
        medical_degree_id:0
    }

const {values,touched,errors,handleSubmit,setFieldValue} = useFormik({
     initialValues:initialValues,
     validationSchema:validationSchema,
    onSubmit:(params:ProfileTypes|FormikValues)=>{
        onSubmit(params);
    }});

const fetchAllMedicalCouncils = async ()=>
    {
    const {status,data:apiData} = await api.get(api.endpoints.medical_council.get,{});
    if(status===200)
    {
        const {statusCode,data} = apiData;
        if(statusCode===200)
        {
            const council_list = data.map((item: { id: number; medical_council: string; })=>{
                return {
                    value: item.id,
                    label: item.medical_council,
                }
            })
           setMedicalCouncils(council_list);
        }
    }
};
    const fetchAllMedicalColleges = async ()=>
    {
    const {status,data:apiData} = await api.get(api.endpoints.medical_colleges.get,{});
    if(status===200)
    {
        const {statusCode,data} = apiData;
        if(statusCode===200)
        {
            const college_list = data.map((item: { id: number; medical_college: string; })=>{
                return {
                    value: item.id,
                    label: item.medical_college,
                }
            })
           setMedicalColleges(college_list);
        }
    }
};

const fetchAllMedicalDegrees = async ()=>
    {
    const {status,data:apiData} = await api.get(api.endpoints.medical_degree.get,{});
    if(status===200)
    {
        const {statusCode,data} = apiData;
        if(statusCode===200)
        {
            const degree_list = data.map((item: { id: number; medical_degree: string; })=>{
                return {
                    value: item.id,
                    label: item.medical_degree,
                }
            })
           setMedicalDegrees(degree_list);
        }
    }
};



 useEffect(() => {
        void (async ()=>{
            await fetchAllMedicalColleges();
            await fetchAllMedicalCouncils();
            await fetchAllMedicalDegrees();
        })();
    }, []);

    useEffect(() => {
        void setFieldValue("medical_degree_file",radiologist.medical_degree_file);
        void setFieldValue("board_cert_file",radiologist.board_cert_file);
        void setFieldValue("medical_degree_id",radiologist.medical_degree_id);
        void setFieldValue("medical_college_id",radiologist.medical_college_id);
        void setFieldValue("medical_council_id",radiologist.medical_council_id);
    }, [radiologist, setFieldValue]);


return (
 <div>
        <div className="px-4 p-1">
            <div>
                <div className="grid grid-cols-3 gap-y-4">
                 <LabelSelectBox
                        width={250}
                        label="Medical Degree"
                        value={values.medical_degree_id}
                        setValue={(option: { value: number; })=>setFieldValue("medical_degree_id",option.value)}
                        touched={touched.medical_degree_id}
                        errorText={errors.medical_degree_id}
                       options={medicalDegrees}
                      />
                   <LabelSelectBox
                        width={250}
                        label="Medical Council"
                        value={values.medical_council_id}
                        setValue={(option: { value: number; })=>setFieldValue("medical_council_id",option.value)}
                        touched={touched.medical_council_id}
                        errorText={errors.medical_council_id}
                       options={medicalCouncils}
                      />
                    <LabelSelectBox
                        width={250}
                        label="Medical College"
                        value={values.medical_college_id}
                        setValue={(option: { value: number; })=>setFieldValue("medical_college_id",option.value)}
                        touched={touched.medical_college_id}
                        errorText={errors.medical_college_id}
                       options={medicalColleges}
                      />
                      <div>
                           <CustomFileUpload
                               width={250}
                               label={"Profile Picture"}
                               value={values.radiologist_image}
                               setValue={(file)=>setFieldValue("radiologist_image",file)}
                               touched={touched.radiologist_image}
                               errorText={errors.radiologist_image}
                           />
                    </div>
                    <div>
                           <CustomFileUpload
                               width={250}
                               label={"Medical Degree"}
                               value={values.medical_degree_file}
                               setValue={(file)=>setFieldValue("medical_degree_file",file)}
                               touched={touched.medical_degree_file}
                               errorText={errors.medical_degree_file}
                           />
                    </div>
                        <div>
                             <CustomFileUpload
                               width={250}
                               label={"Board Certifications"}
                               value={values.board_cert_file}
                               setValue={(file)=>setFieldValue("board_cert_file",file)}
                               touched={touched.board_cert_file}
                               errorText={errors.board_cert_file}

                           />
                        </div>
                </div>
            </div>

        </div>
        <div className="mt-5 text-right">
            <button type="button" onClick={()=> handleSubmit()} className="bg-[#0D6EFD] rounded-[4px] text-white font-semibold px-4 py-[10px]">
                Save Changes
            </button>
        </div>
    </div>
    )
}
export default EditQualificationTab;
