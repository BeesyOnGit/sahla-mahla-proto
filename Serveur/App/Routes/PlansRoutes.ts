import express from "express";
import { AuthVerification } from "../MiddleWear/ServerFunctions";
import { addPlan, deletePlan, editPlan, getAllPlans } from "../Controllers/PlansControllers";
const PlanRoutes = express.Router();

PlanRoutes.post("/", AuthVerification, addPlan);
PlanRoutes.post("/edit/:id", AuthVerification, editPlan);
PlanRoutes.get("/", AuthVerification, getAllPlans);
PlanRoutes.delete("/:id", AuthVerification, deletePlan);

export default PlanRoutes;
