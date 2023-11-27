import React from "react";
import "./Skeleton.css";

function Skuleton({ style }: { style: React.CSSProperties }) {
    return <div className="skeleton-box" style={style}></div>;
}

export default Skuleton;
