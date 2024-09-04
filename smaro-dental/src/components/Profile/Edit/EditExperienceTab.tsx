import React, { useEffect, useState} from "react";

import * as Yup from "yup"
import {useFormik,FormikValues} from "formik";
import {InputEvent,ProfileTypes} from "@/types";

import LabelWithInput from "@/components/Common/LabelWithInput";
import {api} from "@/api/api";
import LabelSelectBox from "@/components/Common/LabelSelectBox";
interface OwnProps {
    radiologist:ProfileTypes|FormikValues;
    onSubmit:(params:ProfileTypes|FormikValues)=>unknown;
}
type Props = OwnProps;
const validationSchema = Yup.object().shape({
        experience: Yup.string().required().label("Years of Experience"),
        speciality_id: Yup.string().required().label("Areas of Specialization"),
        hospital_id: Yup.number().required().label("Hospital"),
        previous_workspace: Yup.string().optional().label("Previous Workplaces or Institutions"),
        notable_Projects: Yup.string().optional().label("Notable Projects or Cases"),
        areas_of_specialization: Yup.string().optional().label("Areas of Specialization"),
        publication_experience:Yup.string().optional().label("Research or Publication Experience"),
        specific_Img_modalities: Yup.string().optional().label("Proficiency in Specific Imaging Modalities"),
        medical_license_details: Yup.string().optional().label("State Medical License Details"),
        experience_pacs: Yup.string().optional().label("Experience with PACS or (RIS)"),
        teleradiology_platforms: Yup.string().optional().label("Comfort with Teleradiology Platforms/Software"),
        malpractice_insurance_info: Yup.string().optional().label("Malpractice Insurance Information"),
        dicom_standards: Yup.string().optional().label("Familiarity with DICOM Standards"),
});
const EditExperienceTab: React.FC<Props> = ({radiologist,onSubmit}) => {

    const [hospitals ,setHospitals] = useState<any[]>([]);
    const [specialities,setSpecialities] = useState([]);
    const initialValues = {
            speciality_id: 0,
            hospital_id:0,
            experience: null,
            previous_workspace: "",
            notable_Projects: "",
            areas_of_specialization: "",
            publication_experience:"",
            specific_Img_modalities: "",
            medical_license_details: "",
            experience_pacs: "",
            teleradiology_platforms: "",
            malpractice_insurance_info: "",
       };

    const {values,touched,errors,handleSubmit,setFieldValue} = useFormik({
        validationSchema:validationSchema,
        initialValues:initialValues,onSubmit:(params:ProfileTypes|FormikValues)=>{
            onSubmit(params);
        }});

    const onChangeInputValue = (type: keyof ProfileTypes, e:InputEvent) =>{
        void setFieldValue(type,e.target.value)
    }


     const fetchAllHospitals = async ()=>{
        const {status,data:apiData} = await api.get(api.endpoints.hospitals.get,{});
        if(status===200)
        {
            const {statusCode,data} = apiData;
            if(statusCode===200)
            {
                const list = data.map((item: { id: number; hospital_name: string; })=>{
                    return {
                        value: item.id,
                        label: item.hospital_name,
                        color: "black",
                    }
                })
               setHospitals(list);
            }
        }
}


    const fetchAllStates = async ()=>{
        const {status,data:apiData} = await api.get(api.endpoints.speciality.get,{});
        if(status===200)
        {
            const {statusCode,data} = apiData;
            if(statusCode===200)
            {
                const state_list = data.map((item: { id: number; speciality: string; })=>{
                    return {
                        value: item.id,
                        label: item.speciality,
                        color:"black"
                    }
                })
               setSpecialities(state_list);
            }
        }
}

    useEffect(() => {
        void (async ()=>{
            await fetchAllHospitals();
            await fetchAllStates();
        })();
    }, []);




    useEffect(() => {

        if(radiologist)
        {
            void setFieldValue("speciality_id",radiologist.speciality_id);
            void setFieldValue("hospital_id",radiologist.hospital_id);
            void setFieldValue("experience",radiologist.experience);
            void setFieldValue("previous_workspace",radiologist.previous_workspace);
            void setFieldValue("notable_Projects",radiologist.notable_Projects);
            void setFieldValue("areas_of_specialization",radiologist.areas_of_specialization);
            void setFieldValue("specific_Img_modalities",radiologist.specific_Img_modalities);
            void setFieldValue("publication_experience",radiologist.publication_experience);
            void setFieldValue("dicom_standards",radiologist.dicom_standards);
            void setFieldValue("experience_pacs",radiologist.experience_pacs);
            void setFieldValue("teleradiology_platforms",radiologist.teleradiology_platforms);
            void setFieldValue("shift_timings",radiologist.shift_timings);
            void setFieldValue("willingness_oncal",radiologist.willingness_oncal);
            void setFieldValue("pref_reporting_format",radiologist.pref_reporting_format);
            void setFieldValue("medical_license_details",radiologist.medical_license_details);
            void setFieldValue("malpractice_insurance_info",radiologist.malpractice_insurance_info);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radiologist]);

    return (
    <div className="w-full mt-10">
            <div className="grid grid-cols-3 items-end gap-10">
                     <LabelSelectBox
                           label="Hospital"
                           theme="light"
                           value={values.hospital_id}
                           width={250}
                           setValue={option=>setFieldValue("hospital_id",option.value)}
                           options={hospitals}
                           touched={touched.hospital_id}
                           errorText={errors.hospital_id}
                    />
                    <LabelWithInput
                        width="250"
                        theme="light"
                        type="number"
                        placeholder=""
                        label="Years of Experience"
                        onChange={(e:InputEvent)=>onChangeInputValue("experience",e)}
                        value={values.experience}
                        errorText={errors.experience}
                        touched={touched.experience}
                    />
                    <LabelWithInput
                        width="250"
                        theme="light"
                        label="Previous Workplaces or Institutions"
                        onChange={(e:InputEvent)=>onChangeInputValue("previous_workspace",e)}
                        errorText={errors.previous_workspace}
                        value={values.previous_workspace}
                        touched={touched.previous_workspace}
                    />
                     <LabelWithInput
                        width="250"
                        theme="light"
                        placeholder=""
                        label="Notable Projects or Cases"
                        onChange={(e:InputEvent)=>onChangeInputValue("notable_Projects",e)}
                        value={values.notable_Projects}
                        errorText={errors.notable_Projects}
                        touched={touched.notable_Projects}
                    />
                <LabelSelectBox
                    label={"Speciality"}
                    theme="light"
                    value={values.speciality_id}
                    width={250}
                    setValue={option=>setFieldValue("speciality_id",option.value)}
                    options={specialities}
                />

                <LabelWithInput
                    width="250"
                    theme="light"
                    label="Areas of Specialization"
                    onChange={(e:InputEvent)=>onChangeInputValue("areas_of_specialization",e)}
                    errorText={errors.areas_of_specialization}
                    value={values.areas_of_specialization}
                    touched={touched.areas_of_specialization}
                />
                <LabelWithInput
                    width="250"
                    theme="light"
                    label="Proficiency in Specific Imaging Modalities"
                    onChange={(e:InputEvent)=>onChangeInputValue("specific_Img_modalities",e)}
                    errorText={errors.specific_Img_modalities}
                    value={values.specific_Img_modalities}
                    touched={touched.specific_Img_modalities}
                />
                <LabelWithInput
                    theme="light"
                    onChange={(e:InputEvent)=>onChangeInputValue("publication_experience",e)}
                    errorText={errors.publication_experience}
                    value={values.publication_experience}
                    width="250"
                    label="Research or Publication Experience"
                    touched={touched.publication_experience}
                />
            <LabelWithInput
                width="250"
                theme="light"
                label="State Medical License Details"
                onChange={(e:InputEvent)=>onChangeInputValue("medical_license_details",e)}
                value={values.medical_license_details}
                errorText={errors.medical_license_details}
                touched={touched.medical_license_details}
            />
                <LabelWithInput
                    theme="light"
                    width="250"
                    label="Malpractice Insurance Information"
                    onChange={(e:InputEvent)=>onChangeInputValue("malpractice_insurance_info",e)}
                    value={values.malpractice_insurance_info}
                    errorText={errors.malpractice_insurance_info}
                    touched={touched.malpractice_insurance_info}
                />
                <LabelWithInput
                    theme="light"
                    width="250"
                    label="Familiarity with DICOM Standards"
                    onChange={(e:InputEvent)=>onChangeInputValue("dicom_standards",e)}
                    value={values.dicom_standards}
                    errorText={errors.dicom_standards}
                    touched={touched.dicom_standards}
                />
                <LabelWithInput
                    width="250"
                    theme="light"
                    label="Experience with PACS or (RIS)"
                    onChange={(e:InputEvent)=>onChangeInputValue("experience_pacs",e)}
                    value={values.experience_pacs}
                    errorText={errors.experience_pacs}
                    touched={touched.experience_pacs}
                />
                <LabelWithInput
                    width="250"
                    theme="light"
                    label="Comfort with Teleradiology Platforms/Software"
                    onChange={(e:InputEvent)=>onChangeInputValue("teleradiology_platforms",e)}
                    errorText={errors.teleradiology_platforms}
                    value={values.teleradiology_platforms}
                    touched={touched.teleradiology_platforms}
                />

            </div>
            <div className="mt-5 text-right px-4">
                <button type="button" onClick={()=> handleSubmit()} className="bg-[#0D6EFD] rounded-[4px] text-white font-semibold px-4 py-[10px]">
                    Save Changes
                </button>
            </div>
</div>
    )
}

export default EditExperienceTab;
