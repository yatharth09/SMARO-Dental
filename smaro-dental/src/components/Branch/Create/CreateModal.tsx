import React, {Fragment, useEffect, useRef, useState} from "react"
import {Dialog, Transition} from "@headlessui/react"
import {XMarkIcon as CloseIcon} from "@heroicons/react/16/solid";

import * as Yup from "yup";
import {useFormik,FormikValues} from "formik";

import LabelWithInput from "@/components/Common/LabelWithInput";
import LabelSelectBox from "@/components/Common/LabelSelectBox";
import CustomFileUpload from "@/components/Common/CustomFileUpload";

import {filterDigits} from "@/utils/utils";
import {InputEvent,DiagnosticCenter} from "@/types";
import {api} from "@/api/api";

interface OwnProps {
    show: boolean;
    setShow: (value: boolean) => void;
    branch: DiagnosticCenter|FormikValues;
    setDiagnostics: (params:DiagnosticCenter|FormikValues)=>any;
    onSubmit: (params:any)=>any;
    onClose: (type:"create"|"edit")=>void;
}

type Props = OwnProps;

const validationSchema = Yup.object().shape({
    branch_name:Yup.string().required().label("Name"),
    branch_address:Yup.string().min(3).required().label("Address"),
    contact_no:Yup.string().required().length(10).label("Number"),
    email:Yup.string().required().email().label("Email"),
    client_id:Yup.string().required().label("Organisation"),
    timing:Yup.string().required().label("Timing"),
    tin: Yup.string().required().label("Tin"),
    business_licence: Yup.string().required().label("Business Licence"),
    hipaa: Yup.string().required().label("HIPAA"),
})

const CreateModal: React.FC<Props> = ({show, setShow,branch,onSubmit,onClose}) => {

    const {values,touched, errors, setFieldValue, handleSubmit} = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            branch_name:"",
            branch_address:"",
            contact_no:"",
            email:"",
            client_id:0,
            inserted_by:0,
            timing: "",
            tin: "",
            business_licence: "",
            hipaa: "",
        },
        onSubmit: (params: DiagnosticCenter|FormikValues) => {
            onSubmit(params);
        }
    });

    const [organisations,setOrganisations] = useState([]);

    const cancelButtonRef = useRef(null)


    const onSetInputValue = (type: keyof DiagnosticCenter, e: InputEvent) => {
        let value = e.target.value
        if(type==="contact_no")
        {
             value = filterDigits(value);
        }
        void setFieldValue(type,value)
    }


  const fetchOrganisations = async () => {
       try {
        const {status: apiStatus, data: apiData} = await api.get(api.endpoints.organisation.get, {});
        if (apiStatus === 200) {
            const {statusCode, data} = apiData;
            if (statusCode === 200) {
             const filtered = data.map((item: { id: number; client_name: string; })=>{
                 return {
                     value: item.id,
                     label: item.client_name
                 }
             })
                setOrganisations(filtered);
            }
        }
       }
       catch (e) {
           console.log(e);
       }
    }



    useEffect(() => {
        void (async ()=>{
            await fetchOrganisations();
        })();
    }, []);

    useEffect(() => {
        if(branch)
        {
            void (async ()=>{
                await setFieldValue("branch_name",branch.branch_name);
                await setFieldValue("branch_address",branch.branch_address);
                await setFieldValue("contact_no",branch.contact_no);
                await setFieldValue("email",branch.email);
                await setFieldValue("client_id",branch.client_id);
                await setFieldValue("timing",branch.timing);
                await setFieldValue("tin",branch.tin);
                await setFieldValue("business_licence",branch.business_licence);
                await setFieldValue("hipaa",branch.hipaa);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [branch]);


  const onSelectOrganisation =(item:{label:string,value:number,color:string})=>{
     void setFieldValue("client_id",item.value);
    }

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
                                style={{width: "1200px", height: "650px"}}
                                className="relative transform rounded-lg bg-white text-left shadow-xl  transition-all sm:my-8 w-[calc(100%-62px)]">
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title as="h3"
                                                              className="text-base font-semibold leading-6 text-gray-900">
                                                    Add New Diagnostics/Hospitals
                                                </Dialog.Title>
                                                   <CloseIcon className="h-6 w-6 text-gray-500" onClick={() => onClose("create")}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b">
                                    <h6 className="text-gray-600 font-medium">Step 1 of 3</h6>
                                    <span className="text-gray-400 font-medium text-base">Center Information , Medical Credentials</span>
                                </div>
                                <div className="px-4 p-1">
                                    <div>
                                       <h1 className="text-black text-xl font-semibold mt-2 mb-4">
                                            Branch Information
                                        </h1>
                                        <div className="grid grid-cols-4 gap-y-4">
                                          <LabelWithInput
                                                width={250}
                                                value={values.branch_name}
                                                onChange={(e: InputEvent) => onSetInputValue("branch_name", e)}
                                                label="Name"
                                                errorText={errors?.branch_name}
                                                touched={touched.branch_name}
                                            />
                                              <LabelSelectBox
                                                width={250}
                                                label={"Organisation"}
                                                value={values.client_id}
                                                setValue={onSelectOrganisation}
                                                options={organisations}
                                                errorText={errors?.client_id}
                                                touched={touched.client_id}
                                            />
                                             <LabelWithInput
                                                width={250}
                                                value={values.email}
                                                onChange={(e: InputEvent) => onSetInputValue("email", e)}
                                                label="email"
                                                errorText={errors?.email}
                                                touched={touched.email}
                                            />
                                            <LabelWithInput
                                                width={250}
                                                value={values.contact_no}
                                                onChange={(e: InputEvent) => onSetInputValue("contact_no", e)}
                                                label="Phone Number"
                                                errorText={errors?.contact_no}
                                                touched={touched.contact_no}
                                            />
                                            <LabelWithInput
                                                width={250}
                                                value={values.branch_address}
                                                onChange={(e: InputEvent) => onSetInputValue("branch_address", e)}
                                                label="Address"
                                                errorText={errors?.branch_address}
                                                touched={touched.branch_address}
                                            />

                                            <LabelWithInput
                                                width={250}
                                                value={values.timing}
                                                onChange={(e: InputEvent) => onSetInputValue("timing", e)}
                                                label="timing"
                                                errorText={errors?.timing}
                                                touched={touched.timing}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-black text-xl font-semibold mt-4 mb-4">Legal and Compliance Information</h1>

                                   <div className="grid grid-cols-4 gap-y-4">
                                       <div>
                                           <CustomFileUpload
                                               width={250}
                                               errorText={errors.tin}
                                               label="Tin"
                                               value={values.tin}
                                               setValue={file=>setFieldValue("tin",file)}
                                               touched={touched.tin}
                                            />
                                       </div>
                                        <div>
                                             <CustomFileUpload
                                               width={250}
                                               label="Business License"
                                               value={values.business_licence}
                                               setValue={file=>setFieldValue("business_licence",file)}
                                               touched={touched.business_licence}
                                               errorText={errors.business_licence}
                                            />
                                       </div>
                                       <div>
                                            <CustomFileUpload
                                               width={250}
                                               label="HIPAA"
                                               value={values.hipaa}
                                               setValue={file=>setFieldValue("hipaa",file)}
                                               touched={touched.hipaa}
                                               errorText={errors.hipaa}
                                            />
                                       </div>
                                   </div>

                                    </div>
                                </div>
                                <div
                                    className="absolute bottom-0 h-[71px] border-t border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
                                    <button onClick={() => setShow(false)} className="bg-[#6C757D] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                        Back
                                    </button>
                                    <button type="button" onClick={() => handleSubmit()} className="bg-[#0D6EFD] rounded-[4px] text-base font-semibold px-4 py-[10px]">
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

export default CreateModal;
