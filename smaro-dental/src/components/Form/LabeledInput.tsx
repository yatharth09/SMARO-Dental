import React from "react";
import Input from "./Input"

interface OwnProps {
    label: string;
    value: string;
    setValue: (text: string) => void
}

type Props = OwnProps;

const LabeledInput: React.FC<Props> = ({label, value, setValue}) => {
    return (<div className="col-span-full">
            <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <Input value={value} setValue={setValue}/>
            </div>
        </div>
    );
};

export default LabeledInput;
