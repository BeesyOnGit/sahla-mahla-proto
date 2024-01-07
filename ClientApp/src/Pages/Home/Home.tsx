import React from "react";
import "./Home.scss";
import { HomeLang } from "./HomeLang";
import { Contexts } from "../../Contexts/Contexts";
import LazyImage from "../../Components/LazyImage/LazyImage";
import Button from "../../Components/Button/Button";
import { dateFormater } from "../../MiddleWear/ClientFunctions";
import ChartLine from "../../Components/Charts/ChartLine";
import FullpageIcon from "../../Components/FullPageIcon/FullpageIcon";
import { userType } from "../../App";
import { ProjectLang } from "../Projects/ProjectsLang";
import { useNavigate } from "react-router-dom";

function Home() {
    const { userLang } = Contexts();
    const navigate = useNavigate();

    const data = {
        labels: ["jav", "fev", "mar", "avr"],
        datasets: [
            {
                label: HomeLang[userLang].revenue,
                data: [0, 0, 0, 0],
                fill: true,
                backgroundColor: (context: any) => {
                    const cols = ["rgba(75, 192, 192,0.5)", "rgba(255, 255, 255, 0)"];
                    if (!context.chart.chartArea) {
                        return;
                    }

                    const {
                        ctx,
                        data,
                        chartArea: { top, bottom },
                    } = context.chart;
                    const gradbg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradbg.addColorStop(0, cols[0]);
                    gradbg.addColorStop(0.25, cols[0]);
                    gradbg.addColorStop(1, cols[1]);
                    return gradbg;
                },
                borderColor: "rgb(75, 192, 192)",
                tension: 0.4,
                pointBorderColor: "rgb(75, 192, 192)",
                pointBackgroundColor: "#ffffff",
                pointBorderWidth: 2,
                pointStyle: "circle",
                pointRadius: 5,
            },
        ],
    };
    return (
        <section className="homePageGeneralContainer customScroll">
            <section className="homeHeadSection">
                <div>
                    <img src="/award.png" alt="" loading="lazy" />
                    <h1> {HomeLang[userLang].subscriptionTitle} </h1>
                    <h2> {HomeLang[userLang].testVer} </h2>
                    <Button content={HomeLang[userLang].subButtoncontent} className="pagesNavButton" />
                </div>
                <div>
                    <div> {HomeLang[userLang].notifs} </div>
                    <span>
                        <Button content={HomeLang[userLang].allNotifs} className="pagesNavButton pagesNavSelected" />
                        <Button content={HomeLang[userLang].unreadNotifs} className="pagesNavButton " />
                    </span>
                    <div> {HomeLang[userLang].greatings} </div>
                    <div> {dateFormater(new Date().getTime())} </div>
                    <div> {HomeLang[userLang].thanks} </div>
                    <a href="" target="blank">
                        https://youtube.com/watch?v=
                    </a>
                    {userType == 2 && (
                        <Button
                            className="pagesNavButton"
                            icon="fi fi-sr-add-document"
                            content={ProjectLang[userLang].createOffer}
                            onClick={() => {
                                navigate("/offers/new");
                            }}
                        />
                    )}
                </div>
            </section>
            <section className="chatSection1">
                <div>
                    <h1> {HomeLang[userLang].chart1tit} </h1>
                    <ChartLine id="004" data={data} />
                </div>
                <div>
                    <h1> {HomeLang[userLang].chart2tit} </h1>
                    <ChartLine id="005" data={data} />
                </div>
                <div>
                    <h1> {HomeLang[userLang].chart3tit} </h1>
                    <ChartLine id="006" data={data} />
                </div>
            </section>
            <section className="chatSection2">
                <div>
                    <h1> {HomeLang[userLang].chart4tit} </h1>
                    <ChartLine id="006" data={data} />
                </div>
                <div>
                    <h1> {HomeLang[userLang].chart5tit} </h1>
                    <ChartLine id="006" data={data} />
                </div>
            </section>
            <section className="tabSection">
                <h1> {HomeLang[userLang].projectTitle} </h1>
                <div>
                    <span> {HomeLang[userLang].table.created} </span>
                    <span> {HomeLang[userLang].table.projectTitle} </span>
                    <span> {HomeLang[userLang].table.client} </span>
                    <span> {HomeLang[userLang].table.status} </span>
                    <span> {HomeLang[userLang].table.amount} </span>
                    <span> {HomeLang[userLang].table.payment} </span>
                </div>

                <section>
                    <FullpageIcon texte={HomeLang[userLang].table.noContent} icon="fi fi-rr-exclamation" />
                </section>
            </section>
        </section>
    );
}

export default Home;
