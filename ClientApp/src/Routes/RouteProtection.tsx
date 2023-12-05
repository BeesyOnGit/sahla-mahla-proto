import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { autUserVerif } from "../MiddleWear/ApiMiddleWear";
import { Contexts } from "../Contexts/Contexts";

function RouteProtection({ children, admin }: any) {
    const { setModalDisp, refresh } = Contexts();
    const navigate = useNavigate();
    const [showProtected, setShowProtected] = useState(false);

    useEffect(() => {
        if (!window.localStorage.user_token) {
            return navigate("/");
        }
        (async () => {
            const res = await autUserVerif();
            const { code, data } = res;
            const { authentified, isAdmin } = data || {};
            const condition = admin ? authentified && isAdmin : authentified;
            if (condition) {
                setShowProtected(true);
            }

            return <Navigate to="/" />;
            // return setShowProtected(authentified);
        })();
    }, []);

    useEffect(() => {
        if (!window.localStorage.user_token) {
            return navigate("/");
        }
        (async () => {
            const res = await autUserVerif();
            const { code, data } = res;
            const { authentified, isAdmin } = data || {};
            const condition = admin ? authentified && isAdmin : authentified;

            if (condition) {
                setShowProtected(true);
            }

            return <Navigate to="/" />;
            // return setShowProtected(authentified);
        })();
    }, [refresh]);

    if (!window.localStorage.user_token) {
        <Navigate to="/" />;
        return setModalDisp(1);
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
