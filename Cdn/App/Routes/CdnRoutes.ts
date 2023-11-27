import express from "express";
import { addMedia, getMedia } from "../Controllers/CdnConrollers";
const CdnRoutes = express.Router();

CdnRoutes.post("/add", addMedia);
CdnRoutes.get("/media/:id", getMedia);

export default CdnRoutes;
