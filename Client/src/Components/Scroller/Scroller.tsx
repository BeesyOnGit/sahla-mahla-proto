import React, { useEffect, useRef, useState } from "react";
import { randomIdGenerator, useWindowDimensions } from "../../MiddleWear/ClientFunctions";
import "./Scrollers.css";

export type scrollersType = {
    children: any;
    scroll?: number;
    title?: string;
};

function Scroller({ children, title, scroll }: scrollersType) {
    const [dispArrows, setDispArrows] = useState<boolean>(false);
    const { width } = useWindowDimensions();

    const childRef = useRef<HTMLDivElement>(null);
    // const ContentId = randomIdGenerator(7);

    useEffect(() => {
        if (childRef.current) {
            const { current } = childRef;
            console.log("🚀 ~ file: Scroller.tsx:22 ~ useEffect ~ current.scrollWidth:", current.scrollWidth);
            if (current.scrollWidth > width!) {
                setDispArrows(true);
            }
        }
    }, [width, childRef.current]);

    const clickToScroll = (direction: "right" | "left") => {
        const toScroll = childRef.current;

        if (direction == "left") {
            toScroll?.scrollBy(scroll ? -scroll : -300, 0);
        }
        if (direction == "right") {
            toScroll?.scrollBy(scroll ? scroll : 300, 0);
        }
    };
    return (
        <section className="scrollerSectionGeneralContainer">
            <div ref={childRef} className="scrollerDivInnerScroll noscroll">
                {children}
            </div>
            {dispArrows && (
                <>
                    <i className="fi fi-sr-angle-circle-left ScrollButtons ScrollIconsLeft" onClick={() => clickToScroll("left")}></i>

                    <i className="fi fi-sr-angle-circle-right ScrollButtons ScrollIconsRight" onClick={() => clickToScroll("right")}></i>
                </>
            )}
        </section>
    );
}

export default Scroller;
