import express from "express";
import { AuthVerification } from "../MiddleWear/ServerFunctions";
import {
    bookmarkLikResource,
    deleteResource,
    editResource,
    getAllResources,
    getMyResources,
    getResourceDetail,
    uploadResource,
} from "../Controllers/ResourcesControllers";
const ResourcesRoutes = express.Router();

ResourcesRoutes.post("/", AuthVerification, uploadResource);
ResourcesRoutes.post("/edit/:id", AuthVerification, editResource);
ResourcesRoutes.get("/", AuthVerification, getAllResources);
ResourcesRoutes.get("/my/:reqType", AuthVerification, getMyResources);
ResourcesRoutes.get("/like-book/:id", AuthVerification, bookmarkLikResource);
ResourcesRoutes.get("/detail/:id", AuthVerification, getResourceDetail);
ResourcesRoutes.delete("/:id", AuthVerification, deleteResource);

export default ResourcesRoutes;
