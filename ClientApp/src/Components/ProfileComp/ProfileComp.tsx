import React from "react";
import "./ProfileComp.scss";
import { freelanceType } from "../../../../Serveur/App/Models/Freelance";
import { clientType } from "../../../../Serveur/App/Models/Clients";
import LazyImage from "../LazyImage/LazyImage";

function ProfileComp(props: Partial<freelanceType | clientType>) {
    const { firstName, familyName, profilePicture, aprouved } = props;
    return (
        <div className="userIngfosContainer">
            {profilePicture ? <LazyImage src={profilePicture} className="cardprofileImg" /> : <i className="fi fi-sr-circle-user profileIco"></i>}
            <div>
                {firstName} {familyName}
            </div>
            {aprouved && <i className="fi fi-ss-badge-check checkUser"></i>}
        </div>
    );
}

export default ProfileComp;
