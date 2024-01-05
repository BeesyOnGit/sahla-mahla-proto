import React from "react";
import FullpageIcon from "../../Components/FullPageIcon/FullpageIcon";
import { Contexts } from "../../Contexts/Contexts";

function Building() {
    const { userLang } = Contexts();
    const lang: any = {
        fr: "page en cours de développement",
        en: "page under development",
        ar: "صفحة قيد التطوير",
    };
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <FullpageIcon icon="fi fi-sr-exclamation" texte={lang[userLang]} />
        </div>
    );
}

export default Building;
