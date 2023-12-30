import React, { FormEvent, useEffect, useState } from "react";
import "./Profile.scss";
import { ProfileInputs } from "./ProfileFunctions";
import { freelanceType } from "../../../../Serveur/App/Models/Freelance";
import { clientType } from "../../../../Serveur/App/Models/Clients";
import AutoInputs from "../../Components/AutoInputs/AutoInputs";
import { generalAddEditFunction, generalGetFunction } from "../../MiddleWear/ClientFunctions";
import { editClientApi, editFreelanceApi, getUtilsApi, getClientInfospi, getFreelanceInfospi, uploadMedia } from "../../MiddleWear/ApiMiddleWear";
import { Contexts } from "../../Contexts/Contexts";
import { ProfileLang } from "./ProfileLang";

function Profile() {
    const { userLang, refreshApp, refresh, setNewAlert, setApiWait, apiWait } = Contexts();

    const [profileForm, setProfileForm] = useState<Partial<freelanceType | clientType>>({});
    const [editedprofileForm, setEditedProfileForm] = useState<Partial<freelanceType | clientType>>({});
    const [wilaya, setWilaya] = useState<any[] | null>(null);
    const [commune, setCommune] = useState<any[] | null>(null);

    useEffect(() => {
        getWilayas();
        getProfile();
    }, [refresh]);

    useEffect(() => {
        if (profileForm.adress?.wilaya) {
            getCommunes(profileForm.adress.wilaya);
        }
    }, [profileForm.adress?.wilaya]);

    const getWilayas = () => {
        generalGetFunction({
            endPoint: getUtilsApi("wilaya"),
            setNewAlert,
            setState: setWilaya,
            refresh: refreshApp,
            successCode: "S52",
        });
    };
    const getCommunes = (wilToSelect: string) => {
        generalGetFunction({
            endPoint: getUtilsApi("commune", `?wilaya=${wilToSelect}`),
            setNewAlert,
            setState: setCommune,
            refresh: refreshApp,
            successCode: "S52",
        });
    };
    const getProfile = () => {
        generalGetFunction({
            endPoint: profileApiCallMap[1](),
            setNewAlert,
            setState: setProfileForm,
            refresh: refreshApp,
            successCode: "S23",
        });
    };

    const editProfile = () => {
        generalAddEditFunction("", {
            endPoint: editProfileApiMap[1](profileForm._id, editedprofileForm),
            setNewAlert,
            successCode: "S21",
            refresh: refreshApp,
            setApiWait,
            apiWait,
        });
    };

    const submit = async (e: FormEvent) => {
        try {
            e.preventDefault();

            if (apiWait) {
                return;
            }

            if (JSON.stringify(editedprofileForm) == "{}") {
                return setNewAlert({ type: "error", message: ProfileLang[userLang].noChanges });
            }

            if (editedprofileForm.profilePicture) {
                return generalAddEditFunction("", {
                    endPoint: uploadMedia({ picture: editedprofileForm.profilePicture }),
                    successCode: "10",
                    setNewAlert,
                    // getData: true,
                    refresh: () => {},
                    setApiWait,
                    apiWait,
                    optFunc: (data: any) => {
                        editedprofileForm.profilePicture = data;
                        editProfile();
                    },
                });
            }

            return editProfile();
        } catch (error) {
            console.log("🚀 ~ file: Profile.tsx:88 ~ submit ~ error:", error);
        }
    };

    const inputs =
        wilaya &&
        ProfileInputs({
            editedState: setEditedProfileForm,
            state: profileForm,
            stateSetter: setProfileForm,
            wilayas: wilaya,
            communes: commune ? commune : [],
        });

    return (
        <section className="profileGeneralContainer customScroll">
            {inputs && <AutoInputs className="profilenputsContainer" inputsArr={inputs} onSubmit={submit} />}
        </section>
    );
}

export default Profile;

const profileApiCallMap: any = {
    1: getFreelanceInfospi,
    2: getClientInfospi,
};
const editProfileApiMap: any = {
    1: editFreelanceApi,
    2: editClientApi,
};
