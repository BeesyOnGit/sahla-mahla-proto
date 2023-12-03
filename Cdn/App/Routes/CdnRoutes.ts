import express from "express";
import { addMedia, getMedia, saveResource } from "../Controllers/CdnConrollers";
const CdnRoutes = express.Router();

CdnRoutes.post("/add", addMedia);
CdnRoutes.post("/resource", saveResource);
CdnRoutes.get("/media/:id", getMedia);

export default CdnRoutes;
