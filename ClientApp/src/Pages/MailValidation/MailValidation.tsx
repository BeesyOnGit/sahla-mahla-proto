import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generalGetFunction } from "../../MiddleWear/ClientFunctions";
import { confirmMailApi } from "../../MiddleWear/ApiMiddleWear";
import { Contexts } from "../../Contexts/Contexts";
import "./MailValidation.scss";
import { MailValidationLang } from "./MailValidationLang";
import GeneralLoading from "../../Components/GeneralLoading/GeneralLoading";

function MailValidation() {
    const { setNewAlert, userLang } = Contexts();

    const [valid, setValid] = useState<boolean>(false);

    const { id } = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        if (!id) {
            return;
        }
        confirmEmail();
    }, [id]);

    useEffect(() => {
        if (valid) {
            const timeOut = setTimeout(() => {
                navigate("/");
                clearTimeout(timeOut);
            }, 5000);
            return () => {
                clearTimeout(timeOut);
            };
        }
    }, [valid]);

    const confirmEmail = () => {
        generalGetFunction({
            endPoint: confirmMailApi(id!),
            successCode: "S11",
            setState: () => {},
            setNewAlert,
            cb: () => {
                setValid(true);
            },
        });
    };
    return (
        <div className="mailValidationPage">
            {valid ? (
                <>
                    <i className="fi fi-br-check-circle"></i>
                    <h1> {MailValidationLang[userLang].mailConfirmed} </h1>
                </>
            ) : (
                <>
                    <GeneralLoading
                        customStyle={{ height: "fit-content" }}
                        customLoadingStyle={{ width: "5rem", height: "5rem", border: "1rem solid var(--siteColor)" }}
                    />
                    <h1> {MailValidationLang[userLang].inValidation} </h1>
                </>
            )}
        </div>
    );
}

export default MailValidation;
