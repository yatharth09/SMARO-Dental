import React  from "react";
import searchIcon from "@/../src/assets/svg/iconly-light-search.svg"
import useSearch from "@/hooks/useSearch";
import {InputEvent} from "@/types";


const SearchBar: React.FC = () => {
     const {onSetSearch} = useSearch();
    return (
        <div className="flex gap-x-2  border px-4 border-[#E9ECEF] py-1 rounded-[4px]">
            <img src={searchIcon} alt="search icon"/>
            <input
                type="text"
                placeholder="Search..."
                className="bg-white w-[240px] text-[16px] font-normal outline-none"
                 onChange={(e:InputEvent)=>onSetSearch(e.target.value)}
            />
        </div>
     );
}

export default SearchBar;
