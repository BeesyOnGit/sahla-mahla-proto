import express from "express";
import { AuthVerification } from "../MiddleWear/ServerFunctions";
import { getCategories, getadressUtils } from "../Controllers/UtilitiesControllers";
const UtilitiesRoutes = express.Router();

UtilitiesRoutes.get("/resource-categories", AuthVerification, getCategories);
UtilitiesRoutes.get("/adress/:util", AuthVerification, getadressUtils);

export default UtilitiesRoutes;
