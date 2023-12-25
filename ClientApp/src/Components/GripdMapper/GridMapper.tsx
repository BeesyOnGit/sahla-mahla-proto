import React, { useRef } from "react";
import { randomArrLength, useWindowDimensions } from "../../MiddleWear/ClientFunctions";
import FullpageIcon from "../FullPageIcon/FullpageIcon";
import "./GridMapper.scss";

type gridmappertype = {
    toMap: any[] | null | "empty";
    Component?: any;
    otherProps?: any;
    emptyString: string;
    emptyIcon: string;
    children?: any;
};

function GridMapper(props: gridmappertype) {
    const { toMap, otherProps, emptyString, emptyIcon, children } = props;

    const ref = useRef<HTMLDivElement>(null);

    // const containerWidth = document.getElementsByClassName("resourcesContainer")[0];
    const { width } = useWindowDimensions();

    let elemsN = Math.floor(ref.current ? ref.current.clientWidth / 310 : 1000 / 310);
    return (
        <div
            ref={ref}
            className="gridMapperContainer customScroll"
            style={toMap != "empty" ? { display: "grid", gridTemplateColumns: `repeat(${elemsN},1fr)` } : {}}
        >
            {Array.isArray(toMap) && toMap.length > 0 ? (
                toMap.map((elem, i) => {
                    return React.cloneElement(children, { ...elem, ...otherProps, key: i });
                })
            ) : toMap == "empty" ? (
                <FullpageIcon icon={emptyIcon ? emptyIcon : "fi fi-br-image-slash"} texte={emptyString} />
            ) : (
                randomArrLength(10, 17).map((e, i) => {
                    return React.cloneElement(children, { skull: true, key: i });
                })
            )}
        </div>
    );
}

export default GridMapper;
