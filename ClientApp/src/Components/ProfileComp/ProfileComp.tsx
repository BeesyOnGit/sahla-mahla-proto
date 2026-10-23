import React from "react";
import "./ProfileComp.scss";
import { freelanceType } from "../../../../Serveur/App/Models/Freelance";
import { clientType } from "../../../../Serveur/App/Models/Clients";
import LazyImage from "../LazyImage/LazyImage";

function ProfileComp(props: Partial<freelanceType | clientType> & { short?: boolean }) {
    const { firstName, familyName, profilePicture, aprouved, short } = props;
    return (
        <div className="userIngfosContainer">
            {profilePicture ? <LazyImage src={profilePicture} className="cardprofileImg" /> : <i className="fi fi-sr-circle-user profileIco"></i>}
            <div>
                {short ? (
                    // buyer is null when its account no longer exists (e.g. cron-generated projects)
                    firstName && `${firstName[0]}.${familyName?.[0] ?? ""}`
                ) : (
                    <>
                        {firstName} {familyName}
                    </>
                )}
            </div>
            {aprouved && <i className="fi fi-ss-badge-check checkUser"></i>}
        </div>
    );
}

export default ProfileComp;
