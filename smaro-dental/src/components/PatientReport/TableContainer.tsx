import React from "react";

interface Props {
    children: React.ReactNode
    dashboard?: boolean
}

const TableContainer: React.FC<Props> = ({children}) => {
    return (
        <div className="bg-white flex flex-col px-[2px] rounded-[12px]">
            <div>
                {children}
            </div>
        </div>
    );
}

export default TableContainer;
