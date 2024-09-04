import React from "react"
import Datepicker from "react-tailwindcss-datepicker";
import calendarIcon from "@/assets/svg/calendar.svg";
import {XMarkIcon as ClearIcon} from "@heroicons/react/16/solid";
import classNames from "classnames";

interface Props {
    width?: string;
    value: {startDate:Date|string,endDate:Date|string};
    setValue: (params:any)=>void;
}


const CustomDateRangePicker: React.FC<Props> = ({width = "240",value,setValue}) => {

    const handleValueChange = (newValue: any) => {
        setValue(newValue);
    }

    return (
        <div style={{width:`${width}rem`}} className="  border  border-[#DEE2E6] rounded-[6px]">

            <Datepicker
                inputClassName={classNames("h-[36px] bg-none pl-4 text-sm font-normal text-black w-full outline-none rounded-[6px]")}
                placeholder="Date Range"
                toggleIcon={(open: boolean) => {return open ? <img src={calendarIcon} alt="Date Range Picker"/> : <ClearIcon className="h-5 w-5 text-gray-500"/>}}
                value={value}
                onChange={handleValueChange}
            />
        </div>
    );
}

export default CustomDateRangePicker;
