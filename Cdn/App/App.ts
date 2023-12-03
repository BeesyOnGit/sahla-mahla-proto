import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import dotenv from "dotenv";
import compression from "compression";

import CdnRoutes from "./Routes/CdnRoutes";

dotenv.config();

//Constatnts definition
const app = express();
const PORT = process.env.PORT;
http.createServer(app);

//Midelware
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(
    compression({
        level: 6,
    })
);

//App upload limite upgrade
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json());

//Comment me Befor deployment
import cors from "cors";
app.use(cors({ origin: "*" }));

// uncomment ME  befor deployment
// import helmet from'helmet'
// app.use(helmet())

// os.networkInterfaces()

//************************************ # API CODE # ****************************************//

//************************************ # API ROUTES # ****************************************//
app.use("/cdn", CdnRoutes);

//************************************ # SERVER PORT SET # ****************************************//

app.listen(PORT, () => {
    console.log(`CDN Serveur live on port ${PORT}`);
});
