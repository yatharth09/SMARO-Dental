import React, {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {ChevronLeftIcon} from "@heroicons/react/16/solid";
import DiagnosisViewInput from "./DiagnosisViewInput";

import closeIcon from "@/assets/svg/x-mark.svg";
import {OHIF_SERVER_URL} from "@/api/api";
interface OwnProps {
    open: boolean;
    onClose: (action:"view"|"report-viewer"|"pdf-viewer") => void;
    analysis: {
        studyId: string;
        studyInstanceId: string;
        patientId:number;
        patientReportId: number;
        patientReportAnalysisId: number
    }
}

type Props = OwnProps;

const OhifViewerDialog: React.FC<Props> = ({open, onClose, analysis}) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const togglePanel = () => {
        setIsCollapsed(!isCollapsed);
    };
  const VIEWER_URL = `${OHIF_SERVER_URL}/viewer?StudyInstanceUIDs=${analysis.studyInstanceId}`;

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" onClose={()=>onClose("report-viewer")} className="relative z-10 max-w-2xl">
                <div className="fixed inset-0 z-10 w-screen">
                    <div className="flex h-screen items-end justify-center text-center sm:items-center sm:p-0">
                        <Dialog.Panel className="w-full h-screen relative transform bg-white text-left shadow-xl transition-all">
                             <div className="bg-white px-4 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className="text-center sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    SmaRo Smart Viewer
                                                </Dialog.Title>
                                                <img className="text-blue-500 w-5" src={closeIcon} onClick={()=>onClose("report-viewer")} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div className="flex flex-row w-full h-[93.5vh] bg-white">
                                <div className={`h-full flex flex-row overflow-hidden transition-all duration-300 ${isCollapsed ? "w-full " : "w-3/5"}`}>
                                    <iframe
                                        className="w-full h-[93.5vh]"
                                        src={VIEWER_URL}
                                        title="Embedded Content"
                                    />
                                    <div className="h-fit mx-1 my-3">
                                    <button
                                        id="toggleButton"
                                        onClick={togglePanel}
                                        className="p-2 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none border border-gray-500">
                                        <ChevronLeftIcon className={`w-6 h-6 transform ${isCollapsed ? "rotate-180" : "rotate-0"}`}/>
                                    </button>
                                </div>
                                </div>
                                <div className={`h-[90vh] overflow-y-scroll transition-all duration-300 ${isCollapsed ? "w-0 mr-0" : "w-2/5 mr-4"}`}>
                                    <div>
                                        <DiagnosisViewInput analysis={analysis}/>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default OhifViewerDialog;
