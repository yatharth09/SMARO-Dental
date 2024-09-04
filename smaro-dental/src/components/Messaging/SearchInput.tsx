import React from "react";
import searchIcon from "@/assets/svg/searchMessages.svg";

interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, setValue }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-between w-[21.563rem]  bg-[#E9E9E9]  h-[3.25rem] rounded-[40px] px-5">
        <input placeholder="Persons, Chats"  value={value}
        type="text"
        onChange={onChange} className="!bg-inherit text-black placeholder:text-black outline-none bg-none" />
        <img src={searchIcon} alt="" />
    </div>
  )
}

export default SearchInput;
