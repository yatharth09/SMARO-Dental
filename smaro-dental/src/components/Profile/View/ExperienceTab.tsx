import React from "react";
import {ProfileTypes} from "@/types";

interface OwnProps {
    profile: ProfileTypes
}

type Props = OwnProps;


const DataLabel = ({title,value}:{title:string;value:string|number})=>{
    return (<div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-black">
                    {title}
                </dt>
                <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
                    {value}
                </dd>
            </div>
    )
}

const ExperienceTab: React.FC<Props> = ({profile}) => {

  return (<div className="w-full">
        <dl>
            <DataLabel title="Hospital" value={profile.hospital_name}/>
            <DataLabel title="Years Of Experience" value={profile.experience}/>
            <DataLabel title="Previous Work Place" value={profile.previous_workspace}/>
            <DataLabel title="Notable Projects or Cases" value={profile.notable_Projects}/>
            <DataLabel title="Speciality" value={profile.speciality}/>
            <DataLabel title="Areas of Specialization" value={profile.areas_of_specialization}/>
            <DataLabel title="Proficiency in Specific Imaging Modalities" value={profile.specific_Img_modalities}/>
            <DataLabel title="Research or Publication Experience" value={profile.publication_experience}/>
            <DataLabel title="State Medical License Details" value={profile.medical_license_details}/>
            <DataLabel title="Malpractice Insurance Information" value={profile.malpractice_insurance_info}/>
            <DataLabel title="Familiarity with DICOM Standards" value={profile.dicom_standards}/>
            <DataLabel title="Experience with PACS or (RIS)" value={profile.experience_pacs}/>
            <DataLabel title="Comfort with Teleradiology Platforms/Software" value={profile.teleradiology_platforms}/>
        </dl>
    </div>);
};

export default ExperienceTab;
