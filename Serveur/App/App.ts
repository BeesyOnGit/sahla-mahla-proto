import bodyParser from "body-parser";
import express, { Express, Request, Response, NextFunction } from "express";
import http from "http";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";
import { DbConnection } from "./DBConnection";
import { sockets } from "./SocketsCode";

import { EventEmitter } from "node:events";

import { Server } from "socket.io";
import AuthRoutes from "./Routes/AuthRoutes";
import EmailConfirmRoutes from "./Routes/UserConfirmRoutes";
import AccountRoutes from "./Routes/AccountRoutes";
import ResourcesRoutes from "./Routes/ResourcesRoutes";
import PlanRoutes from "./Routes/PlansRoutes";
import UtilitiesRoutes from "./Routes/UtilitiesRoutes";
import ProjectRoutes from "./Routes/ProjectRoutes";
import InvoicesRoutes from "./Routes/InvoicesRoutes";

dotenv.config();

//Constatnts definition
const app: any = express();
const PORT = process.env.PORT;
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        // origin: "*",
        origin: "https://app.sahla-mahla.com",
        methods: ["GET", "POST"],
    },
});

//event emmiter setup
class MyEmitter extends EventEmitter {}
export const myEmitter = new MyEmitter();

//Db connection//
DbConnection("mydb", "mongodb://127.0.0.1:27017");

//Midelware
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("x-powered-by", "S&M Back-end Services");
    next();
});
app.use(
    compression({
        level: 7,
    })
);

//App upload limite upgrade
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

//Comment me Befor deployment

app.use(bodyParser.json());
// app.use(cors({ origin: "*" }));
app.use(cors({ origin: "https://app.sahla-mahla.com" }));

// uncomment ME  befor deployment
// import helmet from'helmet'
// app.use(helmet())

// os.networkInterfaces()

//************************************ # Websocket Code # ****************************************//

sockets(io);

//************************************ # API ROUTES # ****************************************//

app.use("/auth", AuthRoutes);
app.use("/confirmation", EmailConfirmRoutes);
app.use("/account", AccountRoutes);
app.use("/resources", ResourcesRoutes);
app.use("/plans", PlanRoutes);
app.use("/invoices", InvoicesRoutes);
app.use("/projects", ProjectRoutes);
app.use("/utils", UtilitiesRoutes);

//************************************ # SERVER PORT SET # ****************************************//

server.listen(PORT, () => {
    console.log(`Server live on port ${PORT}`);
});
