import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { autUserVerif } from "../MiddleWear/ApiMiddleWear";
import { Contexts } from "../Contexts/Contexts";
import { userAuthDataType } from "../../../Serveur/App/Controllers/AuthControllers";
import { initiateUserColors, setUserType } from "../MiddleWear/ClientFunctions";

export type routeProtectionType = {
    children: any;
    openFor?: 1 | 2;
    needValidation?: boolean;
};

function RouteProtection({ children, openFor, needValidation }: routeProtectionType) {
    const { refresh, refreshApp } = Contexts();
    const navigate = useNavigate();
    const [showProtected, setShowProtected] = useState(false);

    useEffect(() => {
        if (!window.localStorage.user_token) {
            return navigate("/login");
        }
        (async () => {
            try {
                const res = await autUserVerif();
                const { code, data }: { code: string; data: userAuthDataType } = res;
                const { auth, userType, validMail, validPhone } = data || {};

                setUserType(userType);

                const openCond = openFor ? openFor == userType : true;

                if (needValidation && !validMail) {
                    navigate("/validation-page");
                    return refreshApp();
                }
                if (auth && openCond) {
                    setShowProtected(true);
                    // initiateUserColors({ property: "siteColor", color: colorMap[userType] });
                }

                return <Navigate to="/" />;
                // return setShowProtected(authentified);
            } catch (error) {
                console.log("🚀 ~ file: RouteProtection.tsx:28 ~ error:", error);
            }
        })();
    }, [refresh]);

    if (!window.localStorage.user_token) {
        return <Navigate to="/login" />;
    }

    if (showProtected == false) {
        <Navigate to="/" />;
        return;
    }
    if (showProtected) {
        return children;
    }
}

export default RouteProtection;

export const colorMap: any = {
    1: "#00d188",
    2: "#eb8015",
};
