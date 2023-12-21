import React, { useRef } from "react";
import { randomArrLength, useWindowDimensions } from "../../MiddleWear/ClientFunctions";
import FullpageIcon from "../FullPageIcon/FullpageIcon";
import "./GridMapper.scss";

type gridmappertype = {
    toMap: any[] | null | "empty";
    Component: any;
    otherProps?: any;
    emptyString: string;
    emptyIcon: string;
};

function GridMapper(props: gridmappertype) {
    const { Component, toMap, otherProps, emptyString, emptyIcon } = props;

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
            {Array.isArray(toMap) ? (
                toMap.map((elem, i) => {
                    return Component({ ...elem, ...otherProps, key: i });
                })
            ) : toMap == "empty" ? (
                <FullpageIcon icon={emptyIcon ? emptyIcon : "fi fi-br-image-slash"} texte={emptyString} />
            ) : (
                randomArrLength(10, 17).map((e, i) => {
                    return Component({ skull: true, key: i });
                })
            )}
        </div>
    );
}

export default GridMapper;
