import express from "express";
import { addMedia, getMedia, getResources, removeResource, saveResource } from "../Controllers/CdnConrollers";
const CdnRoutes = express.Router();

CdnRoutes.post("/add", addMedia);
CdnRoutes.post("/resource", saveResource);
CdnRoutes.get("/media/:id/:folder?", getMedia);
CdnRoutes.get("/resources/:folder/:id", getResources);
CdnRoutes.delete("/resources/:folder/:id", removeResource);
CdnRoutes.delete("/media/:id/:folder?", removeResource);

export default CdnRoutes;
