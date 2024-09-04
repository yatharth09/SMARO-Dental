import React from "react";
import Layout from "../shared/Layout"
import ProfileView from "../components/Profile/ProfileView";

const Profile: React.FC = () => {
    return (
        <Layout>
            <div className="py-8 px-10 bg-[#F8F9FA]">
                <ProfileView/>
            </div>
        </Layout>
    )
}

export default Profile
