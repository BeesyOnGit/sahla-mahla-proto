import React, { useEffect, useState } from "react";
import "./LogoutPage.scss";
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
            // window.localStorage.removeItem("user_token");
            // location.reload();
        }, 10000);

        const interv = setInterval(() => {
            setTimeou((stt) => {
                return stt == 0 ? 0 : stt - 1;
            });
        }, 1000);

        return () => {
            clearTimeout(timeOut);
            clearInterval(interv);
        };
    }, []);
    return (
        <div className="logoutContainer">
            <h1> {LogoutLang[userLang].logoutprogress} </h1>
            <h2>
                <span>{timout}</span> <span> {LogoutLang[userLang].secondUnit} </span>
            </h2>

            <Button
                content={LogoutLang[userLang].cancel}
                className="pagesNavButton pagesNavSelected"
                onClick={() => {
                    navigate("/");
                }}
            />
        </div>
    );
}

export default LougoutPage;
