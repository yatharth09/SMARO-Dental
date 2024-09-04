import React from "react";

interface OwnProps {
    value: string;
    setValue: (e: string) => void;
}

type Props = OwnProps;

const Input: React.FC<Props> = ({value, setValue}) => {
    return (
        <input type="text" name="street-address" id="street-address" value={value}
               onChange={e => setValue(e.target.value)} autoComplete="street-address"
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>)
};

export default Input;
