import React, {useEffect} from "react";
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

const QualificationTab: React.FC<Props> = ({profile}) => {

    useEffect(() => {
        console.log(profile,"profile")
    }, [profile]);

  return (<div className="w-full">
        <dl>
            <DataLabel title="Medical Degree" value={profile.medical_degree}/>
            <DataLabel title="Medical Council" value={profile.medical_council}/>
            <DataLabel title="Medical College" value={profile.medical_college}/>
        </dl>
    </div>);
};

export default QualificationTab;
