import React, { useEffect, useState } from "react";
import "./Library.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Contexts } from "../../Contexts/Contexts";
import Button from "../../Components/Button/Button";
import { LibraryLang } from "./LibraryLang";
import { generalGetFunction, pathWithoutParam } from "../../MiddleWear/ClientFunctions";
import { getCategoriesApi } from "../../MiddleWear/ApiMiddleWear";

function Library() {
    const { userLang } = Contexts();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname != "/library/all") {
            navigate("all");
        }
    }, [pathname]);

    const navigationMap: any = {
        "/library/all": () => {
            navigate("bookmarked");
        },
        "/library/bookmarked": () => {
            navigate("all");
        },
    };
    const contentMap: any = {
        "/library/all": LibraryLang[userLang].myBookmark,
        "/library/bookmarked": LibraryLang[userLang].returnToLib,
    };
    const iconMap: any = {
        "/library/all": "fi fi-br-bookmark",
        "/library/bookmarked": "fi fi-sr-books",
    };

    return (
        <section className="libGeneralContainer">
            <div className="overLcontainer">
                <Button
                    className="pagesNavButton"
                    icon={iconMap[pathWithoutParam(3)]}
                    content={contentMap[pathWithoutParam(3)]}
                    onClick={navigationMap[pathWithoutParam(3)]}
                />
            </div>
            <Outlet />
        </section>
    );
}

export default Library;
