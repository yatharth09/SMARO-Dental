import React, {Fragment, useEffect, useState} from "react";
import ProfileTab from "./View/ProfileTab";
import {api} from "@/api/api";
import useAuth from "@/hooks/useAuth";
import {isNum} from "@/utils/utils";
import QualificationTab from "./View/QualificationTab";
import ExperienceTab from "./View/ExperienceTab";
import PreferenceTab from "./View/PreferenceTab";
import EditProfileTab from "./Edit/EditProfileTab";
import EditQualificationTab from "./Edit/EditQualificationTab";
import classNames from "classnames";
import EditExperienceTab from "./Edit/EditExperienceTab";
import EditPreferenceTab from "./Edit/EditPreferenceTab";
import {FormikValues} from "formik";
import {ProfileTypes} from "@/types";
import {notify} from "@/utils/notify";
import {MdOutlineSecurity} from "react-icons/md";
import {IoMdSettings} from "react-icons/io";
import {MdSpaceDashboard} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import PasswordSecurity from "./PasswordSecurity";


const initialValues: ProfileTypes = {
    active_status_id: 0,
    address: "",
    age: 0,
    areas_of_specialization: "",
    board_cert_file: "",
    city: "",
    pincode: "",
    comments: "",
    commitment_quality_assurance_protocols: "",
    dicom_standards: "",
    email: "",
    experience: 0,
    experience_pacs: "",
    gender: "",
    hospital_id: "",
    id: 0,
    inserted_by: 0,
    inserted_time: "",
    malpractice_insurance_info: "",
    medical_degree_file: "",
    medical_degree_id: "",
    medical_license_details: "",
    mobile: "",
    notable_Projects: "",
    participation_peer_review_programs: "",
    pref_reporting_format: "",
    previous_workspace: "",
    publication_experience: "",
    radiologist_image: "",
    radiologist_name: "",
    recom_endorsements: "",
    ref_colleagues: "",
    regulatory_standards: "",
    shift_timings: "",
    speciality_id: "",
    specific_Img_modalities: "",
    state_id: 0,
    teleradiology_platforms: "",
    willingness_oncal: "",
    medical_college_id: 0,
    medical_council_id: 0,
    state_name: "",
    medical_degree: "",
    medical_council: "",
    medical_college: "",
    hospital_name: "",
    speciality: ""

}

const menus = [
    {
        title: "Profile",
        icon: <CgProfile fontSize={16} className="mr-2"/>
        ,
        description: "Personal Information",
        route: "profile",
    },
    {
        title: "Qualifications",
        icon: <MdSpaceDashboard fontSize={16} className="mr-2"/>,
        description: "Qualifications and Certifications",
        route: "qualifications",
    },
    {
        title: "Work Experience",
        icon: <MdSpaceDashboard fontSize={20} className="mr-2"/>
        ,
        description: "Work Experience, Skills and Specializations, License and Compliance, Technical Proficiency",
        route: "experience",
    },
    {
        title: "Preferences",
        icon: <IoMdSettings fontSize={16} className="mr-2"/>
        ,
        description: "Availability and Preferences, Quality Assurance and Peer Review, References and Recommendations, Additional Comments or Notes",
        route: "preferences",
    },
    {
        title: "Security",
        icon: <MdOutlineSecurity fontSize={16} className="mr-2"/>,
        route: "security",
        description: ""
    }
]

const ProfileView: React.FC = () => {

    const {user} = useAuth();

    const [profile, setProfile] = useState(initialValues);
    const [edit, setEdit] = useState({
        route: "",
        isEdit: false,
    });

    const [menu, setMenu] = useState<{
        title: string;
        icon: any;
        description: string;
        route: string;

    }>({
        title: "",
        icon: <Fragment/>,
        description: "",
        route: "",
    });


    const fetchProfile = async (id: number) => {
        try {
            const {status: apiStatus, data: apiData} = await api.get(api.endpoints.profile.get + "/" + id, {});
            if (apiStatus === 200) {
                const {statusCode, data} = apiData;
                if (statusCode === 200) {
                    setProfile(data[0]);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }


    const goToMenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: any) => {
        e.preventDefault();
        if (edit.isEdit) {
            return;
        }
        setMenu(item);
    }

    const onEditFormSubmit = async (values: ProfileTypes | FormikValues) => {
        const params = {
            ...profile,
            ...values,
        };
        if (!params.id) {
            notify("Invalid Id");
            return;
        }
        try {
            const headers = {
                "Content-Type": "application/json",
            }
            const API_URL = `${api.endpoints.profile.update}/${params.id}`;
            const {status: apiStatus, data: apiData} = await api.put(API_URL, JSON.stringify(params), headers);
            if (apiStatus === 200) {
                const {statusCode, message} = apiData;
                if (statusCode === 200) {
                    notify(message);

                } else {
                    notify(message);
                }
            }
        } catch (e) {
            notify("Something went wrong,please try in sometime");
        }

    }

    useEffect(() => {

        setMenu(menus[0])
    }, []);
    useEffect(() => {
        if (isNum(user?.id)) {
            void (async () => {
                await fetchProfile(user?.id);
            })();
        }
    }, [user]);


    return (
        <div className="flex flex-col w-full h-full bg-none  wrapper rounded-xl  relative">
            <div className="w-full h-full">
                <div className="md:flex">
                    <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                        {
                            menus.map((item, index) => {
                                const styling_classes = item.route === menu.route ? "inline-flex text-[12px] items-center px-4 py-3 text-white rounded-lg active w-full bg-[#45197f]" : "inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-800 hover:bg-gray-700 hover:text-white"
                                return (<li onClick={(e) => goToMenu(e, item)} key={index}>
                                    <a href={`#${item.route}`}
                                       className={classNames(styling_classes, edit.isEdit && "disabled")}
                                       aria-current="page">
                                        {item.icon}
                                        {item.title}
                                    </a>
                                </li>)
                            })
                        }
                    </ul>
                    <div className="p-6 text-medium text-gray-400 bg-white rounded-lg w-full">
                        <div className="flex flex-row justify-between">
                            <h3 className="text-lg font-bold text-black mb-2">{menu.title}</h3>
                            {
                                edit.isEdit ?
                                    (<button onClick={() => setEdit({isEdit: false, route: ""})} type="button"
                                             className="text-white bg-gradient-to-r from-red-400 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                        Back
                                    </button>) :
                                    (<button onClick={() => setEdit({isEdit: true, route: menu.route})} type="button"
                                             className={classNames("text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2", menu.route === "security" && "hidden")}>
                                        Edit
                                    </button>)
                            }
                        </div>
                        <p className="mb-2 text-black font-semibold">{menu.description}</p>
                        {!edit.isEdit && menu.route === "profile" && <ProfileTab profile={profile}/>}
                        {!edit.isEdit && menu.route === "qualifications" && <QualificationTab profile={profile}/>}
                        {!edit.isEdit && menu.route === "experience" && <ExperienceTab profile={profile}/>}
                        {!edit.isEdit && menu.route === "preferences" && <PreferenceTab profile={profile}/>}
                        {!edit.isEdit && menu.route === "security" && <PasswordSecurity/>}
                        {edit.isEdit && edit.route === "profile" &&
                            <EditProfileTab radiologist={profile} onSubmit={onEditFormSubmit}/>}
                        {edit.isEdit && edit.route === "qualifications" &&
                            <EditQualificationTab radiologist={profile} onSubmit={onEditFormSubmit}/>}
                        {edit.isEdit && edit.route === "experience" &&
                            <EditExperienceTab radiologist={profile} onSubmit={onEditFormSubmit}/>}
                        {edit.isEdit && edit.route === "preferences" &&
                            <EditPreferenceTab radiologist={profile} onSubmit={onEditFormSubmit}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileView;

