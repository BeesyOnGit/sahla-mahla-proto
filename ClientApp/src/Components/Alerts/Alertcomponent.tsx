import React, { useEffect, useState } from "react";
import { alertType } from "../../MiddleWear/ClientInterface";

function Alertcomponent(props: alertType) {
    const { type, message } = props;
    // const [timeTilEnd, setTime] = useState<number>(5);

    // useEffect(() => {
    //     const interv = setInterval(() => {
    //         setTime((t) => t - 1);
    //     }, 1000);

    //     return () => {
    //         clearInterval(interv);
    //     };
    // }, []);
    return (
        <div className={alertClassesMap[type] + " alertContainer"}>
            <i className={alertIconsMap[type]}></i> <div>{message}</div>
            {/* <progress value={timeTilEnd} max={5} className="alertProg"></progress> */}
        </div>
    );
}

export default Alertcomponent;

const alertClassesMap = {
    success: "alertSuccess",
    error: "alertError",
    warning: "alertWarning",
};
const alertIconsMap = {
    success: "fi fi-rs-check-circle",
    error: "fi fi-rr-exclamation",
    warning: "fi fi-rr-triangle-warning",
};
