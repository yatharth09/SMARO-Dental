import React, {useState} from "react";
// import clockIcon from "@/assets/svg/clock.svg"
// import searchIcon from "@/assets/svg/search.svg"
// import trashIcon from "@/assets/svg/trash-alt.svg"
// import cameraIcon from "@/assets/svg/camera.svg"
// import uploadIcon from "@/assets/svg/paperclipblack.svg"
import CustomRichText from "../Common/CustomRichText";
import {InputEvent} from "@/types";


interface OwnProps {
    values: {
        report_template_name: string
        findings: string
        impression: string
        comments: string
    };
    onChangeInputValue: (key: string, e: InputEvent) => void;
}

type Props = OwnProps;

const Accordion: React.FC<Props> = ({values, onChangeInputValue}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleSection = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };


    const accordionData = [
        {name: "Findings", dataMember: "findings"}
        , {name: "Impression", dataMember: "impression"}
        , {name: "Comments", dataMember: "comments"}
    ];

    return (
        <div>
            {accordionData.map((section, index) => (
                <div key={index} className="accordion-section">
                    <div
                        className={`accordion-header ${activeIndex === index ? "hidden" : ""}`}
                        onClick={() => toggleSection(index)}
                    >
                        <div
                            className="w-[64.375rem] bg-white rounded-[6px] flex justify-between my-5 items-center px-10 h-[4.875rem] border border-gray-300">
                            <div className="flex items-center gap-x-4">
                                <div className="w-5 h-5 rounded-full border-2 border-blue-500"/>
                                <h2 className="text-xl font-bold text-black">{section.name}</h2>
                            </div>
                            <div className="text-blue-500 cursor-pointer text-2xl">
                                +
                            </div>
                        </div>
                    </div>
                    {activeIndex === index && (
                        <div
                            className="w-[64.375rem] rounded-[6px] bg-white  my-5 items-center py-5 px-10  border border-gray-300">
                            <div>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-4">
                                        <div className="w-5 h-5 rounded-full border-2 border-blue-500"/>
                                        <h2 className="text-xl font-bold text-black">{section.name}</h2>
                                    </div>
                                    {/*<div className="flex items-center gap-x-4">*/}
                                    {/*    <div className="flex items-center gap-x-1">*/}
                                    {/*        <img src={clockIcon} alt=""/>*/}
                                    {/*        <p className="text-blue-500">Past symptoms</p>*/}
                                    {/*    </div>*/}
                                    {/*    <div*/}
                                    {/*        className="flex items-center w-fit h-[2.375rem] border border-gray-300 rounded-[6px] gap-x-2 px-4">*/}
                                    {/*        <img src={searchIcon} className="w-4 h-4" alt=""/>*/}
                                    {/*        <input type="text" placeholder="Search symptoms" className="outline-none"/>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                                <div>
                                    <CustomRichText placeholder="Write a note"
                                                    value={values[section.dataMember as keyof typeof values]}
                                                    dataMember={section.dataMember} onChange={onChangeInputValue}
                                                    className="bg-white outline-none border rounded-[6px] mt-6 border-gray-300 w-full h-full"/>
                                </div>
                                <div className="flex justify-between mt-2">
                                    {/*<div className="flex items-center text-black rounded-full py-1.5 px-4 border border-gray-400 gap-x-3">*/}
                                    {/*    <p>attachment.pdf</p>*/}
                                    {/*    <img className="filter " src={trashIcon} alt="" />*/}
                                    {/*</div>*/}
                                    {/*<div className="flex items-center gap-x-5" >*/}
                                    {/*    <img src={cameraIcon} alt="" />*/}
                                    {/*    <img src={uploadIcon} alt="" />*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
export default Accordion;
