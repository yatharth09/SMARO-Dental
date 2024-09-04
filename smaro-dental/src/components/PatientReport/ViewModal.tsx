import {Fragment, useRef,} from "react"
import {Dialog, Transition} from "@headlessui/react"
import closeIcon from "@/assets/svg/x-mark.svg"
import LabelContainer from "../Common/LabelContainer";
import { ReportAnalysisTypes} from "@/types";

interface OwnProps {
    show: boolean;
    report: ReportAnalysisTypes;
    onClose: (action:"view"|"report-viewer"|"pdf-viewer") => void;
}

type Props = OwnProps;

export default function ViewModal({show, report,onClose}: Props) {

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10 max-w-2xl" initialFocus={cancelButtonRef} onClose={()=>onClose("view")}>
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

                <div className="fixed inset-0 z-10  overflow-y-auto">
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
                                style={{width: "55.875rem", height: "42.563rem"}}
                                className="relative transform rounded-lg bg-white text-left shadow-xl  transition-all sm:my-8 w-[calc(100%-62px)]">
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Patient Preview
                                                </Dialog.Title>
                                                <img className="text-blue-500 w-6" src={closeIcon} onClick={()=>onClose("view")} alt="" />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="my-5 mx-5 px-5">
                                    <h3 className="text-black font-bold"><u>Personal Details</u></h3>
                              </div>
                              <div className="w-full h-full flex flex-col gap-y-5 px-10">
                                <div className="flex gap-x-5 w-full justify-between">
                                    <div className="w-60">
                                        <LabelContainer label="Name">
                                            <p className="text-gray-500">{report?.patient_name}</p>
                                        </LabelContainer>
                                    </div>
                                    <div className="w-60">
                                        <LabelContainer label="Mobile No">
                                            <p className="text-gray-500">{report?.patient_mobile}</p>
                                        </LabelContainer>
                                    </div>
                                </div>
                                <div className="flex gap-x-5 w-full justify-between">
                                    <div className="w-60">
                                        <LabelContainer label="DOB">
                                        <p className="text-gray-500">{new Date(report?.dob)?.toLocaleDateString()}</p>
                                        </LabelContainer>
                                    </div>
                                    <div className="w-60">
                                       <LabelContainer label="Email">
                                            <p className="text-gray-500">{report?.patient_email}</p>
                                        </LabelContainer>
                                    </div>
                                </div>
                                <div className="flex gap-x-5 w-full justify-between">
                                    <div className="w-60">
                                        <LabelContainer label="Address">
                                            <p className="text-gray-500">{report?.address}</p>
                                        </LabelContainer>
                                    </div>
                                    <div className="w-60">
                                        <LabelContainer label="Gender">
                                            <p className="text-gray-500">{report?.gender}</p>
                                        </LabelContainer>
                                    </div>
                                </div>

                                <div >
                                    <h3 className="text-black font-bold"><u>Branch & Organisation Details Details</u></h3>
                                </div>
                                <div className=" flex flex-col gap-y-5 px-1">
                                    <div className="flex gap-x-5 w-full justify-between">
                                        <div className="w-60">
                                            <LabelContainer label="Branch Name">
                                                <p className="text-gray-500">{report?.branch_name}</p>
                                            </LabelContainer>
                                       </div>
                                       <div className="w-60">
                                            <LabelContainer label="Organization">
                                                <p className="text-gray-500">{report?.client_name}</p>
                                            </LabelContainer>
                                        </div>
                                    </div>
                                    </div>
                                <div >
                                    <h3 className="text-black font-bold"><u>Test Type</u></h3>
                                </div>
                                <div className=" flex flex-col gap-y-5 px-1">
                                    <div className="flex gap-x-5 w-full justify-between">
                                        <div className="w-60">
                                            <LabelContainer label="Test type">
                                                <p className="text-gray-500">{report?.test_type}</p>
                                            </LabelContainer>
                                       </div>
                                       <div className="w-60">
                                            <LabelContainer label="Test Subtype">
                                                <p className="text-gray-500">{report?.test_sub_type}</p>
                                            </LabelContainer>
                                        </div>
                                    </div>
                                    </div>


                                    </div>
                                <div className=" absolute bottom-0 h-[71px] border-t border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
                                    <button onClick={()=>onClose("view")}  className="bg-[#6C757D] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                        Cancel
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
