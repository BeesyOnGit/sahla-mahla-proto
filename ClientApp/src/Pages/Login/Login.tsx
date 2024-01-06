import React, { useEffect, useState } from "react";
import "./Login.css";
import { URLSearchAdd, URLSearchParse, URLSearchremove, setUserType, useWindowDimensions } from "../../MiddleWear/ClientFunctions";
import { Contexts } from "../../Contexts/Contexts";
import { LoginLang } from "./LoginLang";
import Inputs from "../../Components/Inputs/Inputs";
import { InputsContent, loginFunction } from "./LoginFunctions";
import Button from "../../Components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileLang } from "../Profile/ProfileLang";

export type LoginInputs = {
    id?: string;
    passWord?: string;
};

function Login() {
    const { userLang, setNewAlert } = Contexts();

    const { search } = useLocation();
    const { userType } = URLSearchParse();

    const [loginForm, setLoginForm] = useState<LoginInputs>({});
    const [apiResponse, setApiResponse] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userType) {
            URLSearchAdd(navigate, { userType: 1 });
            setUserType(1);
        }
    }, []);

    const InputsValue = InputsContent({ state: loginForm, setState: setLoginForm, setNewAlert, lang: userLang });

    const handleLogin = () => {
        loginFunction({ form: loginForm, userType, setNewAlert, lang: userLang });
    };
    const changeLogType = (type: number) => {
        setUserType(type);
        // URLSearchremove(null, "userType");
        URLSearchAdd(navigate, { userType: type });
        setLoginForm({});
    };

    const bgClass: any = {
        2: "",
        1: "cardbg",
    };
    const nonbgClass: any = {
        1: "",
        2: "cardbg",
    };

    return (
        <div className="loginPageContainer">
            <div className="container ">
                <div className={"card " + bgClass[userType && userType]}>
                    <div className="loginDiv ">
                        <div className="LogTitle bgColCli"> {LoginLang[userLang].title} </div>
                        {userType == 2 &&
                            Array.isArray(InputsValue) &&
                            InputsValue.map((Input, index) => {
                                return <Inputs {...Input} key={index} />;
                            })}
                        <div>{apiResponse}</div>
                        <div
                            onClick={() => {
                                changeLogType(1);
                            }}
                            className="changeLink"
                        >
                            {LoginLang[userLang].freelanceQuestion}
                        </div>
                        <div
                            onClick={() => {
                                navigate("/register");
                            }}
                            className="changeLink"
                        >
                            {ProfileLang[userLang].register}
                        </div>
                        <Button
                            icon="fi fi-br-enter"
                            content={LoginLang[userLang].button}
                            onClick={() => handleLogin()}
                            className="clickButton w-full bgColCli lightCol"
                        />
                    </div>
                    <div className="registerDiv bgColfreel">
                        <img className="loginImg" src="/logo.webp" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className={"card " + nonbgClass[userType && userType]}>
                    <div className="loginDiv ">
                        <div className="LogTitle bgColfreel"> {LoginLang[userLang].titleFreelance} </div>
                        {userType == 1 &&
                            Array.isArray(InputsValue) &&
                            InputsValue.map((Input, index) => {
                                return <Inputs {...Input} key={index} />;
                            })}
                        <div>{apiResponse}</div>
                        <div
                            onClick={() => {
                                changeLogType(2);
                            }}
                            className="changeLink"
                        >
                            {LoginLang[userLang].notFreelanceQuestion}
                        </div>
                        <div
                            onClick={() => {
                                navigate("/register");
                            }}
                            className="changeLink"
                        >
                            {ProfileLang[userLang].register}
                        </div>
                        <Button
                            icon="fi fi-br-enter"
                            content={LoginLang[userLang].button}
                            onClick={() => handleLogin()}
                            className="clickButton w-full bgColfreel lightCol"
                        />
                    </div>
                    <div className="registerDiv bgColCli">
                        <img className="loginImg" src="/logo.webp" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
