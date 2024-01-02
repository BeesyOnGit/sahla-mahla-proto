import React, { useEffect, useState } from "react";
import { LogoutLang } from "./LogoutLang";
import { Contexts } from "../../Contexts/Contexts";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

function LougoutPage() {
    const { userLang } = Contexts();

    const [timout, setTimeou] = useState<number>(10);

    const navigate = useNavigate();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            window.localStorage.removeItem("user_token");
            location.reload();
        }, 10000);

        const interv = setInterval(() => {
            setTimeou((stt) => stt - 1);
        }, 1000);

        return () => {
            clearTimeout(timeOut);
            clearInterval(interv);
        };
    }, []);
    return (
        <div>
            <h1> {LogoutLang[userLang].logoutprogress} </h1>
            <h1> {timout} </h1>

            <Button
                content={LogoutLang[userLang].cancel}
                icon=""
                className="pagesNavButton"
                onClick={() => {
                    navigate("/");
                }}
            />
        </div>
    );
}

export default LougoutPage;
