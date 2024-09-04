import React, {Fragment, useEffect, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react"

import {FormikValues, useFormik} from "formik";
import * as Yup from "yup";
import {XMarkIcon as CloseIcon} from "@heroicons/react/16/solid";

import LabelWithInput from "@/components/Common/LabelWithInput";
import MultiSelectBox from "@/components/Common/MultiSelectBox";
import LabelSelectBox from "@/components/Common/LabelSelectBox";


import {InputEvent,DiagnosticCenter} from "@/types";
import SwitchInput from "@/components/Common/SwitchInput";
import {filterDigits} from "@/utils/utils";
import {api} from "@/api/api";

interface StepTwoDiagnosticModalProps {
   show: boolean;
   setShow: (value: boolean) => void;
   setShowStepOne: (value: boolean) => void;
   branch: DiagnosticCenter|FormikValues;
   goToNext:  (params:DiagnosticCenter|FormikValues)=>any;
   goBack:  (params:DiagnosticCenter|FormikValues)=>any;
   onClose: (type:"create"|"edit")=>void;
}



const validationSchema = Yup.object().shape({
    no_of_Img_machines : Yup.number().required().label("Number of Imaging Machines"),
    hours_of_operation : Yup.string().required().label("Hours of Operation"),
    dicom_comp_of_Img_equip : Yup.string().required().label("DCIM Compatibility Of Imaging Equipment"),
    res_time_exp_for_Img_analysis : Yup.string().required().label("Response Time Expectations for Image Analysis"),
    avail_urgent_cases : Yup.string().required().label("Availability For Urgent Cases"),
    reporting_formats : Yup.string().required().label("Reporting Format And Timelines"),
    accreditation_info : Yup.boolean().required().label("Accreditation Info"),
});

const closed_question_options = [
    {value:true,label:"Yes",color:"black"},
    {value:false,label:"No",color:"black"}
]

const hour_options: { label: string; value: any; color: string; }[] = [];
for (let i = 1; i <= 24; i++) {
    hour_options.push({ value: `${i}`, label: `${i} hr`, color: "#000000" });
}
hour_options.push({ value: "24/7", label: "24/7", color: "#FF0000" });

const StepTwoEditModal: React.FC<StepTwoDiagnosticModalProps> = ({
    show,
    setShow,
    setShowStepOne,
    goToNext,
    goBack,
    branch,
    onClose
    }) => {
const [equipTypes,setEquipTypes] = useState([]);
const [imagingEquipments,setImgingEquipments] = useState([]);
 const cancelButtonRef = useRef(null);
 const {values,touched,errors,handleSubmit,setFieldValue} = useFormik({
        initialValues: {
            no_of_Img_machines: 0,
            types_of_Img_equipments: "",
            hours_of_operation: "",
            dicom_comp_of_Img_equip: "",
            info_on_pacs: "",
            Internet_con_details: "",
            res_time_exp_for_Img_analysis: "",
            avail_urgent_cases: "",
            reporting_formats: "",
            accreditation_info: "",
            radiologists_credentials: "",
            sec_measures_for_data_protection: "",
            access_control_mechanisms_data: "",
        },
        validationSchema: validationSchema,
        onSubmit: (params:DiagnosticCenter|FormikValues) => {
            goToNext(params)
        }
    });

  const onSetInputValue = (key: keyof DiagnosticCenter, e:InputEvent) => {
       let value = e.target.value;
       if(key==="hours_of_operation"||key==="no_of_Img_machines")
       {
           value = filterDigits(value);
       }
        void setFieldValue(key, value);
  }

  const toggleCheckBox = (key:keyof DiagnosticCenter,value:boolean)=>{
       void setFieldValue(key, !value)
    }

      const fetchImagingEquipmentTypes = async () => {
       try {
        const {status: apiStatus, data: apiData} = await api.get(api.endpoints.test_type.get, {});
        if (apiStatus === 200) {
            const {statusCode, data} = apiData;
            if (statusCode === 200) {
             const filtered = data.map((item: {  test_type: string; })=>{
                 return {
                     value: item.test_type,
                     label: item.test_type
                 }
             })
                setEquipTypes(filtered);
            }
        }
       }
       catch (e) {
           console.log(e);
       }
    }
    useEffect(() => {
        void (async ()=>{
            await fetchImagingEquipmentTypes();
        })();
    }, []);

    useEffect(() => {
        if(branch)
        {
              void (async ()=>{
                await setFieldValue("no_of_Img_machines",branch.no_of_Img_machines);
                await setFieldValue("types_of_Img_equipments",branch.types_of_Img_equipments);
                await setFieldValue("hours_of_operation",branch.hours_of_operation);
                await setFieldValue("dicom_comp_of_Img_equip",branch.dicom_comp_of_Img_equip);
                await setFieldValue("info_on_pacs",branch.info_on_pacs);
                await setFieldValue("Internet_con_details",branch.Internet_con_details);
                await setFieldValue("res_time_exp_for_Img_analysis",branch.res_time_exp_for_Img_analysis);
                await setFieldValue("avail_urgent_cases",branch.avail_urgent_cases);
                await setFieldValue("reporting_formats",branch.reporting_formats);
                await setFieldValue("accreditation_info",branch.accreditation_info);
                await setFieldValue("radiologists_credentials",branch.radiologists_credentials);
                await setFieldValue("sec_measures_for_data_protection",branch.sec_measures_for_data_protection);
                await setFieldValue("access_control_mechanisms_data",branch.access_control_mechanisms_data);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [branch]);

 const onSelectOption =(key:keyof DiagnosticCenter,item:{label:string,value:number,color:string})=>{
     void setFieldValue(key,item.value);
    }

    useEffect(() => {
         const selected = imagingEquipments.map((item:{value:any})=>item.value).join(",") ;
         void setFieldValue("types_of_Img_equipments",selected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagingEquipments]);

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10 max-w-2xl" initialFocus={cancelButtonRef} onClose={(val) => {
                setShow(val);
                setShowStepOne(!val)
            }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                style={{width: "1200px", height: "800px"}}
                                className="relative transform rounded-lg bg-white text-left shadow-xl  transition-all sm:my-8 w-[calc(100%-62px)]">
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Edit Diagnostic / Hospital
                                                </Dialog.Title>
                                               <CloseIcon className="h-6 w-6 text-gray-500" onClick={() => onClose("edit")}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b">
                                    <h6 className="text-gray-600 font-medium">Step 2 of 3</h6>
                                    <span className="text-gray-400 font-medium text-base">Facility Details, Technical Requirements,Service Level Agreement (SLA) Preferences,Credentials and Certifications.</span>
                                </div>
                                <div className="px-4 p-1">
                                    <div>
                                        <h1 className="text-black text-xl font-semibold mt-2 mb-4">Facility Details</h1>
                                        <div className="flex gap-x-20">
                                            <LabelWithInput
                                                onChange={(e:InputEvent)=>onSetInputValue("no_of_Img_machines",e)}
                                                width="300"
                                                placeholder="12"
                                                label="Number of Imaging Machines"
                                                value={values.no_of_Img_machines}
                                                errorText={errors.no_of_Img_machines}
                                                touched={touched.no_of_Img_machines}
                                             />

                                            <MultiSelectBox
                                                width={300}
                                                label={"Types of Imaging Equipment Available"}
                                                value={imagingEquipments}
                                                setValue={(val)=>setImgingEquipments(val)}
                                                options={equipTypes}
                                                errorText={errors?.types_of_Img_equipments}
                                                touched={touched.types_of_Img_equipments}
                                           />

                                             <LabelSelectBox
                                                width={300}
                                                label={"Hours of Operation"}
                                                value={values.hours_of_operation}
                                                setValue={(val)=>onSelectOption("hours_of_operation",val)}
                                                options={hour_options}
                                                errorText={errors?.hours_of_operation}
                                                touched={touched.hours_of_operation}
                                             />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-black text-xl font-semibold mt-6 mb-4">Technical Requirements</h1>
                                        <div className="flex gap-x-20">
                                            <LabelSelectBox
                                                width={300}
                                                label={"DCIM Compatibility Of Imaging Equipment"}
                                                value={values.dicom_comp_of_Img_equip}
                                                setValue={(val)=>onSelectOption("dicom_comp_of_Img_equip",val)}
                                                options={closed_question_options}
                                                errorText={errors?.dicom_comp_of_Img_equip}
                                                touched={touched.dicom_comp_of_Img_equip}
                                             />

                                            <LabelWithInput
                                                onChange={(e:InputEvent)=>onSetInputValue("info_on_pacs",e)}
                                                value={values.info_on_pacs}
                                                width="300"
                                                label="Information on PACS"
                                                errorText={errors.info_on_pacs}
                                                touched={touched.info_on_pacs}
                                            />
                                            <LabelWithInput
                                                onChange={(e:InputEvent)=>onSetInputValue("Internet_con_details",e)}
                                                value={values.Internet_con_details}
                                                width="300"
                                                label="Internet Connectivity Details"
                                                errorText={errors.Internet_con_details}
                                                touched={touched.Internet_con_details}
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-black text-xl font-semibold mt-6 mb-4">Service Level
                                            Agreement (SLA) Preferences</h1>
                                        <div className="flex gap-x-20">
                                            <LabelWithInput
                                                onChange={(e:InputEvent)=>onSetInputValue("res_time_exp_for_Img_analysis",e)}
                                                value={values.res_time_exp_for_Img_analysis}
                                                width="300"
                                                label="Response Time Expectations for Image Analysis"
                                                errorText={errors.res_time_exp_for_Img_analysis}
                                                touched={touched.res_time_exp_for_Img_analysis}
                                            />
                                            <LabelSelectBox
                                                width={300}
                                                label={"Availability for Urgent Cases"}
                                                value={values.avail_urgent_cases}
                                                setValue={(val)=>onSelectOption("avail_urgent_cases",val)}
                                                options={closed_question_options}
                                                errorText={errors?.avail_urgent_cases}
                                                touched={touched.avail_urgent_cases}
                                             />

                                            <LabelWithInput
                                                onChange={(e:InputEvent)=>onSetInputValue("reporting_formats",e)}
                                                value={values.reporting_formats}
                                                width="300"
                                                label="Reporting Formats and Timelines"
                                                errorText={errors.reporting_formats}
                                                touched={touched.reporting_formats}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-black text-xl font-semibold mt-6 mb-4">Credentials and
                                            Certifications:</h1>
                                        <div className="flex gap-x-[79px]">

                                              <SwitchInput
                                                  label="Accreditation Information (if any)"
                                                  value={values.accreditation_info}
                                                  setValue={()=>toggleCheckBox("accreditation_info",Boolean(values?.accreditation_info))}
                                                  errorText={errors.accreditation_info}
                                              />
                                            <LabelWithInput
                                                onChange={(e:InputEvent)=>onSetInputValue("radiologists_credentials",e)}
                                                value={values.radiologists_credentials}
                                                width="300"
                                                label="Radiologists' Credentials and Certifications"
                                                errorText={errors.radiologists_credentials}
                                                touched={touched.radiologists_credentials}
                                            />

                                        </div>
                                    </div>

                                </div>
                                <div
                                    className="absolute bottom-0 h-[71px] border-t border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
                                    <button onClick={() => {
                                        goBack(values)
                                    }} className="bg-[#6C757D] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                        Back
                                    </button>
                                    <button
                                        onClick={() =>  handleSubmit()}
                                        className="bg-[#0D6EFD] rounded-[4px] text-base font-semibold px-4 py-[10px]"
                                    >
                                        Next
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default StepTwoEditModal;
