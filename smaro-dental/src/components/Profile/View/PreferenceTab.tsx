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

const PreferenceTab: React.FC<Props> = ({profile}) => {

  return (<div className="w-full">
        <dl>
            <DataLabel title="Availability Hours or Shift Preferences" value={profile.shift_timings}/>
            <DataLabel title="Willingness for On-call or Emergency Cases" value={profile.willingness_oncal}/>
            <DataLabel title="Preferred Reporting Formats or Systems" value={profile.pref_reporting_format}/>
            <DataLabel title="Participation in Peer Review Programs" value={profile.participation_peer_review_programs}/>
            <DataLabel title="Commitment to Quality Assurance Protocols" value={profile.commitment_quality_assurance_protocols}/>
            <DataLabel title="References from Previous Employers or Colleagues" value={profile.ref_colleagues}/>
            <DataLabel title="Recommendations or Endorsements" value={profile.recom_endorsements}/>
            <DataLabel title="Additional Comments or Notes" value={profile.comments}/>
        </dl>
    </div>);
};

export default PreferenceTab;
