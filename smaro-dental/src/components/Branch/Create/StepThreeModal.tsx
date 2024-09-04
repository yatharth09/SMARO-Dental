import React, {useEffect} from "react";
import {Fragment, useRef} from "react"
import {Dialog, Transition} from "@headlessui/react"


import * as Yup from "yup";
import {FormikValues, useFormik} from "formik";


import {XMarkIcon as CloseIcon} from "@heroicons/react/16/solid";
import LabelWithInput from "@/components/Common/LabelWithInput";
import InputLabelSwitch from "@/components/Common/InputLabelSwitch";

import {InputEvent,InputTextAreaEvent,DiagnosticCenter} from "@/types";


interface OwnProps {
    show: boolean;
    setShow: (value: boolean) => void;
    setShowStepTwo:(value: boolean) => void;
    branch: DiagnosticCenter|FormikValues;
    goToNext:   (params:DiagnosticCenter|FormikValues)=>unknown;
    goBack:  (params:DiagnosticCenter|FormikValues)=>unknown;
    onClose: (type:"create"|"edit")=>void;
}

const validationSchema = Yup.object().shape({
     sec_measures_for_data_protection: Yup.string().required().label("Security Measures for Patient Data Protection"),
     access_control_mechanisms_data: Yup.string().required().label("Access Control Mechanisms for Data Handling"),
     disaster_recovery_plan: Yup.string().required().label("Disaster Recovery Plan"),
     com_proto_img_reports: Yup.string().required().label("Communication Protocols for Sending/Receiving Images and Reports"),
     billing_contact_info: Yup.string().required().label("Billing Contact Information"),
     comments: Yup.string().required().label(""),
});

const StepThreeModal: React.FC<OwnProps> = ({
    show,
    goToNext,
    goBack,
    branch,
    onClose
       }) => {

     const {values,touched,errors,handleSubmit,setFieldValue} = useFormik({
        initialValues: {
             sec_measures_for_data_protection: "",
            access_control_mechanisms_data: "",
            disaster_recovery_plan: "",
            com_proto_img_reports: "",
            billing_contact_info: "",
            comments: ""
        },
        validationSchema: validationSchema,
        onSubmit: (params:DiagnosticCenter|FormikValues) => {
            goToNext(params)
        }
    });

       const onSetInputValue = (type: keyof DiagnosticCenter, e:InputEvent) => {
        void setFieldValue(type, e.target.value)
       }

        const onSetTextAreaInputValue = (type:  keyof DiagnosticCenter, e:InputTextAreaEvent) => {
        void setFieldValue(type, e.target.value)
       }

    const cancelButtonRef = useRef(null);

       useEffect(() => {
        if(branch)
        {
              void (async ()=>{
                await setFieldValue("sec_measures_for_data_protection",branch.sec_measures_for_data_protection);
                await setFieldValue("access_control_mechanisms_data",branch.access_control_mechanisms_data);
                await setFieldValue("disaster_recovery_plan",branch.disaster_recovery_plan);
                await setFieldValue("com_proto_img_reports",branch.com_proto_img_reports);
                await setFieldValue("billing_contact_info",branch.billing_contact_info);
                await setFieldValue("comments",branch.comments);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [branch]);

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10 max-w-2xl" initialFocus={cancelButtonRef} onClose={()=>onClose("create")}>
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
                                style={{width: "1200px", height: "750px"}}
                                className="relative transform rounded-lg bg-white text-left shadow-xl  transition-all sm:my-8 w-[calc(100%-62px)]">
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-base font-semibold leading-6 text-gray-900"
                                                >
                                                    Add New Diagnostics/Hospitals
                                                </Dialog.Title>
                                                <CloseIcon className="h-6 w-6 text-gray-500" onClick={() => onClose("create")}/>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b">
                                    <h6 className="text-gray-600 font-medium">Step 3 of 3</h6>
                                    <span className="text-gray-400 font-medium text-base">Data Security and Access, Integration and Communication, Billing and Payment Information,Additional Comments or Notes.</span>
                                      <span className="text-red-600 text-sm">{JSON.stringify(errors)}</span>
                                </div>
                                <div className="px-4 p-1">
                                    <div>
                                        <h1 className="text-black text-xl font-semibold mt-2 mb-4">Data Security and
                                            Access</h1>
                                        <div className="flex gap-x-20">
                                            <LabelWithInput
                                                width="300"
                                                label="Security Measures for Patient Data Protection"
                                                value={values.sec_measures_for_data_protection}
                                                onChange={(e:InputEvent)=>onSetInputValue("sec_measures_for_data_protection",e)}
                                                errorText={errors.sec_measures_for_data_protection}
                                                touched={touched.sec_measures_for_data_protection}
                                            />
                                            <LabelWithInput
                                                onChange={(e:InputEvent)=>onSetInputValue("access_control_mechanisms_data",e)}
                                                width="300"
                                                label="Access Control Mechanisms for Data Handling"
                                                value={values.access_control_mechanisms_data}
                                                errorText={errors.access_control_mechanisms_data}
                                                touched={touched.access_control_mechanisms_data}
                                            />
                                            <LabelWithInput
                                                onChange={(e:InputEvent)=>onSetInputValue("disaster_recovery_plan",e)}
                                                width="300"
                                                label="Disaster Recovery Plan"
                                                value={values.disaster_recovery_plan}
                                                errorText={errors.disaster_recovery_plan}
                                                touched={touched.disaster_recovery_plan}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-black text-xl font-semibold mt-6 mb-4">Integration and Communication</h1>
                                        <div className="flex gap-x-4">
                                            <InputLabelSwitch label="Electronic Medical Record (EMR) System Used (if any)"/>
                                            <LabelWithInput
                                                onChange={(e:InputEvent)=>onSetInputValue("com_proto_img_reports",e)}
                                                width="300"
                                                label="Communication Protocols for Sending/Receiving Images and Reports"
                                                value={values.com_proto_img_reports}
                                                errorText={errors.com_proto_img_reports}
                                                touched={touched.com_proto_img_reports}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-black text-xl font-semibold mt-6 mb-4">Billing and Payment Information</h1>
                                        <div className="flex gap-x-[190px]">
                                            <LabelWithInput
                                                onChange={(e:InputEvent)=>onSetInputValue("billing_contact_info",e)}
                                                width="300"
                                                label="Billing Contact Information"
                                                value={values.billing_contact_info}
                                                errorText={errors.billing_contact_info}
                                                touched={touched.billing_contact_info}
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-black text-xl font-semibold mt-6 mb-4">Additional Comments or Notes</h1>
                                        <div className="flex gap-x-[79px]">
                                           <textarea
                                               className="text-base font-normal resize-none w-[725px] text-black px-2 py-[5px] bg-white border border-[#DEE2E6] outline-none rounded-[6px]"
                                               placeholder="Write a message"
                                               onChange={(e:InputTextAreaEvent)=>onSetTextAreaInputValue("comments",e)}
                                               defaultValue={values.comments}
                                           />

                                        </div>
                                          {touched.comments && errors?.comments && <span className="text-xs text-red-600">{String(errors?.comments)}</span>}
                                    </div>

                                </div>
                    <div className="absolute bottom-0 h-[71px] border-t border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
                        <button
                            onClick={()=> goBack(branch)}  className="bg-[#6C757D] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                            Back
                        </button>
                        <button onClick={()=>handleSubmit()} className="bg-[#0D6EFD] rounded-[4px] text-base font-semibold px-4 py-[10px]">
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
export default StepThreeModal;
