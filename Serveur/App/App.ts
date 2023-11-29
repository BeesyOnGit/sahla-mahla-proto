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
import EmailConfirmRoutes from "./Routes/EmailConfirmRoutes";

dotenv.config();

//Constatnts definition
const app: any = express();
const PORT = process.env.PORT;
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "*",
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
        level: 6,
    })
);

//App upload limite upgrade
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Comment me Befor deployment

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
// app.use(cors({ origin: ["https://arabatii.com/"] }));

// uncomment ME  befor deployment
// import helmet from'helmet'
// app.use(helmet())

// os.networkInterfaces()

//************************************ # Websocket Code # ****************************************//

sockets(io);

//************************************ # API ROUTES # ****************************************//

app.use("/auth", AuthRoutes);
app.use("/email", EmailConfirmRoutes);

//************************************ # SERVER PORT SET # ****************************************//

server.listen(PORT, () => {
    console.log(`Server live on port ${PORT}`);
});
