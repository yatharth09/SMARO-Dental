import React, { useState} from "react";
import Select,{StylesConfig} from "react-select";

interface OwnProps {
    defaultValues:any[];
    onChange:(params:any)=>void;
}

type Props = OwnProps;

const selectStyles:StylesConfig<{label:string;value:string,color:string},true> = {
    option : (baseStyles)=>{
        return {
            ...baseStyles,
            color:"black"
        }
    }
}
const ImagingEquipmentOption: React.FC<Props> = ({defaultValues=[]}) => {
    const [options,_] = useState<any[]>([]);


    return (<div  style={{width: "300px"}}><Select  styles={selectStyles}  defaultValue={defaultValues}  options={options} isMulti={true} className="flex flex-col w-full relative" /></div>);
};

export default ImagingEquipmentOption;
