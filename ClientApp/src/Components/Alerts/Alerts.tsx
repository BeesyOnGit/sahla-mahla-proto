import React from "react";
import "./Alerts.css";
import { alertType } from "../../MiddleWear/ClientInterface";
import { Contexts } from "../../Contexts/Contexts";
import Alertcomponent from "./Alertcomponent";

function Alerts() {
    const { alerts } = Contexts();

    return (
        <div className="AlertsGeneralContainer">
            {alerts
                ? alerts.map((e: alertType, i) => {
                      return <Alertcomponent key={i} {...e} />;
                  })
                : null}
        </div>
    );
}

export default Alerts;
