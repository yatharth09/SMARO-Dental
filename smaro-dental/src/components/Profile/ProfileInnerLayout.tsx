import React from "react"
import classNames from "classnames"
import useSettings from "@/hooks/useSettings"

import EditProfile from "./EditProfile"
import PasswordSecurity from "./PasswordSecurity"
import {setEditProfile} from "@/store/reducers/settings.slice";
import useDispatchAction from "@/hooks/useDispatchAction";

const ProfileInnerLayout: React.FC = () => {
    const dispatch = useDispatchAction();
    const {profile} = useSettings()
    const isEditProfile = profile?.navigation === "edit-profile";
    return (
        <div className="flex flex-row w-full h-full">
            <div className="flex flex-col gap-y-6 h-[35rem] w-min p-8 border-r-[2px] border-[#E8EAEE66]">
                <button
                    className={classNames("text-base font-bold  text-left p-3 w-[185px] rounded-[8px]", !isEditProfile ? "bg-none text-[#CACED8]" : "bg-[#CFE2FF] text-[#083A50]")}
                    onClick={() => dispatch(setEditProfile("edit-profile"))}>Edit Profile
                </button>
                <button
                    className={classNames("text-base font-bold text-left p-3 w-[185px] rounded-[8px]", isEditProfile ? "bg-none text-[#CACED8]" : "bg-[#CFE2FF] text-[#083A50]")}
                    onClick={() => {
                        dispatch(setEditProfile("password"))
                    }}>Password & Security
                </button>
            </div>
            <div className="w-full p-8">
                {isEditProfile ? <EditProfile/> : <PasswordSecurity/>}
            </div>
        </div>
    )
}

export default ProfileInnerLayout
