import React, { useEffect, useRef } from "react";
import { URLSearchAdd, URLSearchParse, URLSearchremove, randomArrLength, useWindowDimensions } from "../../MiddleWear/ClientFunctions";
import FullpageIcon from "../FullPageIcon/FullpageIcon";
import "./GridMapper.scss";
import { useNavigate } from "react-router-dom";

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
    const { width } = useWindowDimensions();

    const gridID = "gridMap";

    const navigate = useNavigate();

    const { page } = URLSearchParse();

    const numPerPage = 10;

    useEffect(() => {
        if (Array.isArray(toMap) && toMap?.length < (page ? parseInt(page) * numPerPage : numPerPage)) {
            return ref.current?.scrollTo(0, 0);
        }

        let observer = new IntersectionObserver(CallNewCards);

        if (Array.isArray(toMap) && toMap.length > 0) {
            const elem = document.getElementById(`${gridID}-${toMap?.length! - 2}`);

            observer.observe(elem!);
            return () => {
                observer.unobserve(elem!);
            };
        }
    }, [toMap]);

    const CallNewCards: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach((e: any) => {
            const { isIntersecting, time, target } = e;

            if (isIntersecting) {
                observer.disconnect();
                URLSearchAdd(navigate, { page: page ? parseInt(page) + 1 : 2 });
            }
        });
    };

    let elemsN = Math.floor(ref.current ? ref.current.clientWidth / 310 : 1000 / 310);
    return (
        <div
            ref={ref}
            className="gridMapperContainer customScroll"
            style={toMap != "empty" ? { display: "grid", gridTemplateColumns: `repeat(${elemsN},1fr)` } : {}}
        >
            {Array.isArray(toMap) && toMap.length > 0 ? (
                toMap.map((elem, i) => {
                    return React.cloneElement(children, { ...elem, ...otherProps, key: i, id: `${gridID}-${i}` });
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
