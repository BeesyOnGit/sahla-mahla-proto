import React, { FormEvent, useEffect, useState } from "react";
import "../Profile/Profile.scss";
import "./Register.scss";
import { RegisterInputs } from "./RegisterFunctions";
import { freelanceType } from "../../../../Serveur/App/Models/Freelance";
import { clientType } from "../../../../Serveur/App/Models/Clients";
import AutoInputs from "../../Components/AutoInputs/AutoInputs";
import { URLSearchAdd, URLSearchParse, generalAddEditFunction, generalGetFunction, initiateUserColors } from "../../MiddleWear/ClientFunctions";
import { getUtilsApi, uploadMedia, registerFreelanceApi, registerClientApi } from "../../MiddleWear/ApiMiddleWear";
import { Contexts } from "../../Contexts/Contexts";
import { ProfileLang } from "../Profile/ProfileLang";
import { useLocation, useNavigate } from "react-router-dom";
import { colorMap } from "../../Routes/RouteProtection";
import Button from "../../Components/Button/Button";

function Register() {
    const { userLang, refreshApp, refresh, setNewAlert, setApiWait, apiWait } = Contexts();

    const [profileForm, setProfileForm] = useState<Partial<freelanceType | clientType>>({});
    const [wilaya, setWilaya] = useState<any[] | null>(null);
    const [commune, setCommune] = useState<any[] | null>(null);

    const { search, pathname } = useLocation();
    const { userType } = URLSearchParse();

    const navigate = useNavigate();

    useEffect(() => {
        getWilayas();
    }, [refresh]);

    useEffect(() => {
        if (!userType) {
            initiateUserColors({ property: "siteColor", color: colorMap[1] });
            return URLSearchAdd(navigate, { userType: 1 });
        }
        initiateUserColors({ property: "siteColor", color: colorMap[userType] });
    }, [search, pathname]);

    useEffect(() => {
        if (profileForm.adress?.wilaya) {
            getCommunes(profileForm.adress.wilaya);
        }
    }, [profileForm.adress?.wilaya]);

    const buttonContentMap: any = {
        1: ProfileLang[userLang].asFreelance,
        2: ProfileLang[userLang].asClient,
    };

    const getWilayas = () => {
        generalGetFunction({
            endPoint: getUtilsApi("wilaya"),
            setNewAlert,
            setState: setWilaya,
            // refresh: refreshApp,
            successCode: "S52",
            silent: true,
        });
    };
    const getCommunes = (wilToSelect: string) => {
        generalGetFunction({
            endPoint: getUtilsApi("commune", `?wilaya=${wilToSelect}`),
            setNewAlert,
            setState: setCommune,
            // refresh: refreshApp,
            successCode: "S52",
            silent: true,
        });
    };

    const registerUser = (user: Partial<freelanceType | clientType>) => {
        generalAddEditFunction("", {
            endPoint: editProfileApiMap[userType](user),
            setNewAlert,
            successCode: "S01",
            refresh: refreshApp,
            setApiWait,
            apiWait,
            optFunc: () => {
                setProfileForm({});

                const timeOut = setTimeout(() => {
                    navigate("/login");
                    clearTimeout(timeOut);
                }, 3000);
            },
        });
    };

    const submit = async (e: FormEvent) => {
        try {
            e.preventDefault();

            if (apiWait) {
                return;
            }

            if (JSON.stringify(profileForm) == "{}") {
                return setNewAlert({ type: "error", message: ProfileLang[userLang].noChanges });
            }

            if (profileForm.profilePicture) {
                return generalAddEditFunction("", {
                    endPoint: uploadMedia({ picture: profileForm.profilePicture }),
                    successCode: "10",
                    setNewAlert,
                    // getData: true,
                    refresh: () => {},
                    setApiWait,
                    apiWait,
                    optFunc: (data: any) => {
                        // profileForm.profilePicture = data;
                        registerUser({ ...profileForm, profilePicture: data });
                    },
                });
            }

            return registerUser(profileForm);
        } catch (error) {
            console.log("🚀 ~ file: Register.tsx:106 ~ submit ~ error:", error);
        }
    };

    const inputs =
        wilaya &&
        RegisterInputs({
            state: profileForm,
            stateSetter: setProfileForm,
            wilayas: wilaya,
            communes: commune ? commune : [],
        });

    const changeUserType = () => {
        // URLSearchremove(null, "userType");
        const type = userType == 1 ? 2 : 1;
        URLSearchAdd(navigate, { userType: type });
        setProfileForm({});
        initiateUserColors({ property: "siteColor", color: colorMap[type] });
    };
    return (
        <section className="profileGeneralContainer customScroll registerContainer">
            <div>
                <h1> {ProfileLang[userLang].register} </h1>
                <Button
                    content={buttonContentMap[userType]}
                    className="pagesNavButton"
                    onClick={() => {
                        changeUserType();
                    }}
                />
            </div>
            {inputs && <AutoInputs className="profilenputsContainer" inputsArr={inputs} onSubmit={submit} />}
        </section>
    );
}

export default Register;

const editProfileApiMap: any = {
    1: registerFreelanceApi,
    2: registerClientApi,
};
