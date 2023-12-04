import express from "express";
import { AuthVerification } from "../MiddleWear/ServerFunctions";
import { deleteResource, editResource, getAllResources, getResourceDetail, uploadResource } from "../Controllers/ResourcesControllers";
const ResourcesRoutes = express.Router();

ResourcesRoutes.post("/", AuthVerification, uploadResource);
ResourcesRoutes.post("/edit", AuthVerification, editResource);
ResourcesRoutes.get("/", AuthVerification, getAllResources);
ResourcesRoutes.get("/detail/:id", AuthVerification, getResourceDetail);
ResourcesRoutes.delete("/:id", AuthVerification, deleteResource);

export default ResourcesRoutes;
