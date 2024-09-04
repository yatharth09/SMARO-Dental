import React, {useEffect, useState} from "react";
import {ProfileTypes} from "@/types";
import {api, AWS_BUCKET_URL} from "@/api/api";

interface OwnProps {
    profile: ProfileTypes
}

type Props = OwnProps;


const DataLabel = ({title, value}: { title: string; value: any }) => {
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

const SignatureLabel = ({title, value}: { title: string; value: string }) => {
    return (<div className="px-2 flex items-center py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-black">
                {title}
            </dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
                <img src={`${AWS_BUCKET_URL}/${value}`} width={100}/>
            </dd>
        </div>
    )
}


const ProfileTab: React.FC<Props> = ({profile}) => {
    const [signature, setSignature] = useState<string>()


    const getSignature = async () => {
        try {
            const {data: apiData} = await api.get(`${api.endpoints.radiologistSignature.get}/${profile.id}`)
            const {data, statusCode} = apiData
            console.log(data, "profile")
            if (statusCode === 200) {
                setSignature(data.signature)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        void (async () => {
            await getSignature();
        })()
    }, [profile]);

    return (<div className="w-full">
        <dl>
            <DataLabel title="Name" value={profile.radiologist_name}/>
            <DataLabel title="Mobile" value={profile.mobile}/>
            <DataLabel title="Email" value={profile.email}/>
            <DataLabel title="Gender" value={profile.gender}/>
            <DataLabel title="Age" value={profile.age}/>
            <DataLabel title="Address" value={profile.address}/>
            <DataLabel title="City" value={profile.city}/>
            <DataLabel title="State" value={profile.state_name}/>
            {
                signature?.length ?
                    <SignatureLabel title="Signature" value={signature}/>
                    : null
            }
        </dl>
    </div>);
};

export default ProfileTab;
