import express from "express";
import { AuthVerification } from "../MiddleWear/ServerFunctions";
import { getCategories, getUtils } from "../Controllers/UtilitiesControllers";
const UtilitiesRoutes = express.Router();

UtilitiesRoutes.get("/resource-categories", AuthVerification, getCategories);
UtilitiesRoutes.get("/:util", AuthVerification, getUtils);

export default UtilitiesRoutes;
