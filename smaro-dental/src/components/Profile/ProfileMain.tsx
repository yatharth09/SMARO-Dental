import React from "react";
import ProfileInnerLayout from "./ProfileInnerLayout";

const ProfileMain:React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full bg-white  wrapper rounded-xl shadow-sm relative">
            <div className="w-full h-full">
                <ProfileInnerLayout/>
            </div>
        </div>
    )
}

export default ProfileMain;

