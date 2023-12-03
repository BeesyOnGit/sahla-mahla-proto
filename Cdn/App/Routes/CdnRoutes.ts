import express from "express";
import { addMedia, getMedia, getResources, saveResource } from "../Controllers/CdnConrollers";
const CdnRoutes = express.Router();

CdnRoutes.post("/add", addMedia);
CdnRoutes.post("/resource", saveResource);
CdnRoutes.get("/media/:id", getMedia);
CdnRoutes.get("/resources/:id", getResources);

export default CdnRoutes;
