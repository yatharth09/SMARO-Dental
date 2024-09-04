interface CustomInputProps {
    value?:string;
    onChange?:(arg:React.ChangeEvent<HTMLInputElement>)=>void;
    placeholder?:string
    width?:number;
    type?:React.HTMLInputTypeAttribute
}

const CustomInput : React.FC<CustomInputProps> = ({onChange,value,placeholder="Choose file",width=240,type="text"}) => {
    return (
        <div className={`w-[${width}px]`}>
    <input  type={type} className="text-base font-normal text-black px-2 py-[5px] bg-white border border-[#DEE2E6] outline-none rounded-[6px]" value={value} onChange={onChange} placeholder={placeholder}/>

        </div>
    )
}


export default CustomInput
