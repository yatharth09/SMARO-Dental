import React from "react";
import ReactQuill from "react-quill";

interface CustomRichTextProps {
    value?:string;
    dataMember?: string;
    onChange?:any;
    placeholder?:string
    width?:number;
    className?:string;
}

const CustomInput : React.FC<CustomRichTextProps> = ({onChange,value,dataMember,placeholder="Write Note", className=""}) => {
    const onChangeText = (content : string) => {
        onChange(dataMember, {target : { value : content}})
    }

    return (
        <div>
            <ReactQuill placeholder={placeholder} value={value}  onChange={onChangeText} className={className} />
        </div>
    )
}


export default CustomInput
