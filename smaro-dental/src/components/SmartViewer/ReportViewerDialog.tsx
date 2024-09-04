import { Transition, Dialog } from "@headlessui/react";
import {Fragment} from "react"
import React from "react";
import closeIcon from "@/assets/svg/x-mark.svg"
import {ReportAnalysisTypes} from "@/types";
import PdfReportViewer from "./PdfReportViewer";


interface OwnProps {
    show : boolean;
     onClose: (action:"view"|"report-viewer"|"pdf-viewer") => void;
    analysis:ReportAnalysisTypes;
  }

  type Props = OwnProps;
const ReportViewerDialog : React.FC<Props> = ({analysis, show, onClose}) => {

  return (
    <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10 max-w-2xl" onClose={()=>onClose("pdf-viewer")}>
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
                            <Dialog.Panel style={{width: "50rem"}} className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[calc(100%-62px)]">

                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className="text-center sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Report  Viewer
                                                </Dialog.Title>
                                                <img className="text-blue-500 w-5" src={closeIcon} onClick={() => onClose("pdf-viewer")} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-full flex flex-col gap-y-5">
                                   <PdfReportViewer item={analysis}/>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
    </Transition.Root>



  );
};

export default ReportViewerDialog;




