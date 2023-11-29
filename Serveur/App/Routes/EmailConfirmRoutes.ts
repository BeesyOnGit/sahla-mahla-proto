import express from "express";
import { confirmEmail } from "../Controllers/EmailsControllers";

const EmailConfirmRoutes = express.Router();

EmailConfirmRoutes.get("/confirm/:confirmString", confirmEmail);

export default EmailConfirmRoutes;
