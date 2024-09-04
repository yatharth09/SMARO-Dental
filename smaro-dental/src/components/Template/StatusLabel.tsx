import React from "react";

interface OwnProps {
    status: number;
}

type Props = OwnProps;
const StatusLabel: React.FC<Props> = ({status}) => {

    let label = "In Active";
    let styles ={backgroundColor: "#664D03", color: "#FFFFFF"};
    if (status === 1) {
        label = "Active";
        styles ={backgroundColor: "#05824a", color: "#FFFFFF"}
    }
    if (status === 0) {
        label = "In Active";
        styles ={backgroundColor: "#c0081b", color: "#FFFFFF"}
    }
    return (<div className="flex px-2 justify-center items-center w-[80px] h-[25px] rounded"
                 style={styles}>
        <p className="capitalize text-sm font-semibold">{label}</p>
    </div>);
};

export default StatusLabel;
