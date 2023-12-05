import React from "react";
import "./FullPageIcon.css";

type FullPgeIconType = {
    icon: string;
    texte?: string;
};
function FullpageIcon(props: FullPgeIconType) {
    const { icon, texte } = props;
    return (
        <div className="FullPageIconGeneralContainer">
            <i className={icon + " FullPageIcon"}></i>
            {texte ? <div className="FullPageIcon"> {texte} </div> : null}
        </div>
    );
}

export default FullpageIcon;
