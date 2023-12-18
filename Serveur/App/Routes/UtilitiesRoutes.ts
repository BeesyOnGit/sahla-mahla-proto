import express from "express";
import { AuthVerification } from "../MiddleWear/ServerFunctions";
import { getCategories } from "../Controllers/UtilitiesControllers";
const UtilitiesRoutes = express.Router();

UtilitiesRoutes.get("/resource-categories", AuthVerification, getCategories);

export default UtilitiesRoutes;
