import React from "react";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {FaFilePdf} from "react-icons/fa";
import {GrDocumentText} from "react-icons/gr";
import DocxSaveButton from "@/components/Common/DocxSaveButton";
import {strcmp} from "@/utils/utils";
import {BiLoaderCircle} from "react-icons/bi";
import {Tooltip} from "react-tooltip";

const iconSize = 15

interface ActionProps {
    item: any;
    onPressActionBtn: (action: any, params: any) => void;
}

const Actions: React.FC<ActionProps> = ({item, onPressActionBtn}) => {
    return (
        <div className="flex items-center gap-x-1">
            <button onClick={() => onPressActionBtn("report-viewer", item)}
                    className="bg-[#0D6EFD] flex items-center justify-center p-1.5 rounded-lg">
                <MdOutlineRemoveRedEye className="fill-white" size={iconSize}/>
            </button>
            <button onClick={() => onPressActionBtn("view", item)}
                    className="bg-[#10bce3] flex items-center justify-center p-1.5 rounded-lg">
                <GrDocumentText className="stroke-white" size={iconSize}/>
            </button>
            {
                strcmp(item?.report_status) === "completed" ?
                    <button data-tooltip-id="pdf-tooltip-start" data-tooltip-content="See PDF report"
                            onClick={() => onPressActionBtn("pdf-viewer", item)}
                            className="bg-[#101ee3] flex items-center justify-center p-1.5 rounded-lg">
                        <FaFilePdf className="fill-white"/>
                        <Tooltip id={"pdf-tooltip-start"}/>

                    </button> :
                    <div data-tooltip-id="pdf-tooltip" data-tooltip-content="Please wait..."
                         className="relative flex justify-center items-center group">
                        <button
                            className="bg-[#101ee3] flex items-center justify-center p-1.5 rounded-lg disabled">
                            <BiLoaderCircle className="text-white motion-safe:animate-spin"/>
                        </button>
                        <Tooltip id={"pdf-tooltip"}/>
                    </div>
            }
            {
                strcmp(item?.report_status) === "completed" ?
                    <div data-tooltip-id="doc-tooltip-download" data-tooltip-content="Dowload the DOCX">

                        <DocxSaveButton item={item}/>
                        <Tooltip id={"doc-tooltip-download"}/>

                    </div> : <div data-tooltip-id="doc-tooltip" data-tooltip-content="Please wait..."
                                  className="relative flex justify-center items-center group">
                        <button
                            className="bg-green-500 flex items-center justify-center p-1.5 rounded-lg disabled">
                            <BiLoaderCircle className="text-white motion-safe:animate-spin"/>
                        </button>
                        <Tooltip id={"doc-tooltip"}/>
                    </div>
            }
        </div>
    )
}

export default Actions;
