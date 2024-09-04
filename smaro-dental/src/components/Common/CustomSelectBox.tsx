import React, {useEffect, useState} from "react";
import Select, { StylesConfig} from "react-select";
import Colors from "@/theme/Colors";

interface OwnProps {
    label:string;
    width:number;
    value:any;
    setValue:(val:any)=>void;
    options:{label:string,value:any,color:string}[];
}

type Props = OwnProps;

const CustomSelectBox: React.FC<Props> = ({label,value,width,setValue,options}) => {

    const selectStyles:StylesConfig<{label:string;value:string,color:string},true> = {
    option : (baseStyles)=>{
        return {
            ...baseStyles,
            color:"black",
        }
    },
    container: (baseStyles)=>{
        return {
            ...baseStyles,
            width:`${width}px`,
            backgroundColor: Colors.white,
        }
    },
        singleValue: (baseStyle)=>{
           return {
               ...baseStyle,
               paddingLeft:"10px",
               paddingRight:"10px",
           }
        }
}

const [selected,setSelected] = useState({
    value:"",
    label:label,
    color:"black"
});


    useEffect(() => {
        const item = options.find(item=>item.value===value);
        if(item!==undefined && item!==null)
        {
            setSelected(item);
        }


    }, [options,value]);
  return (
      <Select
          value={selected}
          styles={selectStyles}
          onChange={item=>setValue(item)}
          options={options}
          className="text-base font-normal text-black bg-white"
          placeholder={label}
      />
  );
};

export default CustomSelectBox;
