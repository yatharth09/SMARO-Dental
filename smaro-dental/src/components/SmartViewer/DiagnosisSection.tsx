import React , {useEffect, useRef, useState} from "react"

import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";

import DOMPurify from "dompurify";


interface OwnProps {
    sectionName: string;
    value: any;
    dataName: string;
    isEditEnabled?: boolean;
    isDataTrigger: boolean;
    diagnosisIsChanged: (dataName: string, diagnosisText: string) => void
}

type Props = OwnProps;
const  DiagnosisSection: React.FC<Props> = ({...props}) =>{

    const quillRef = useRef<ReactQuill>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(decodeURIComponent(props.value));


    useEffect(() => {
        if (props.isDataTrigger && props.isEditEnabled) {
            props.diagnosisIsChanged(props.dataName, encodeURIComponent(value));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isDataTrigger]);

    useEffect(() => {
        setValue(decodeURIComponent(props.value));
    }, [props.value]);

    const onChangeValue = (html:any)=>{
          html = DOMPurify.sanitize(html);
         setValue(html);
    }


    return (
        <div>
            <div className="flex justify-between items-center text-black">
                <strong>{props.sectionName}</strong>
                <div>
                    {props.isEditEnabled && !isEdit && <MdEdit className="fill-green-600" size={20} onClick={() => setIsEdit(true)} />}
                    {props.isEditEnabled && isEdit && <FaEye className="fill-blue-600" size={20} onClick={() => setIsEdit(false)} />}
                </div>

            </div>
            {!isEdit && <div className="text-black" dangerouslySetInnerHTML={{__html: value}}>
            </div>}

            {isEdit &&
                <div>
                    <br/>
                    <ReactQuill ref={quillRef} onChange={onChangeValue} className="text-black" value={value}></ReactQuill>
                </div>
            }
            <br/>
        </div>
    )
}

export default DiagnosisSection;
