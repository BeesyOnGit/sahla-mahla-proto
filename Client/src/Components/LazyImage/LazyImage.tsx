import React, { useEffect, useRef, useState } from "react";
import "./LazyImage.css";
export type lazyImageType = React.HTMLAttributes<HTMLDivElement> & {
    src: string;
};

function LazyImage(props: lazyImageType) {
    const { src, className, children, onClick } = props;

    const [loadImage, setLoadImage] = useState<boolean>(false);

    const imageRefference = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(showImage);

        if (imageRefference.current) {
            observer.observe(imageRefference.current);
        }

        return () => {
            if (imageRefference.current) {
                observer.unobserve(imageRefference.current);
            }
        };
    }, [imageRefference.current]);

    const showImage = (entries: any, observer: any) => {
        entries.forEach((e: any) => {
            if (e.isIntersecting) {
                setLoadImage(true);
            }
        });
    };

    const style: any = {
        true: { backgroundImage: `url(${src})` },
        false: { backgroundColor: "#ffffff9e" },
    };

    return (
        <div
            ref={imageRefference}
            style={style[`${loadImage}`]}
            className={className ? className : "imageCompDefaultClass"}
            onClick={onClick ? onClick : () => {}}
        >
            {children ? children : null}
        </div>
    );
}

export default LazyImage;
