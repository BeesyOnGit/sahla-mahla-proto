import express from "express";
import { AuthVerification } from "../MiddleWear/ServerFunctions";
import { createProjetc, deleteProject, editProject, getAllProjects } from "../Controllers/ProjectControllers";

const ProjectRoutes = express.Router();

ProjectRoutes.post("/", AuthVerification, createProjetc);
ProjectRoutes.post("/edit:id", AuthVerification, editProject);
ProjectRoutes.delete("/:id", AuthVerification, deleteProject);
ProjectRoutes.get("/", AuthVerification, getAllProjects);

export default ProjectRoutes;
