import express from "express";
import { confirmEmail, resetPassword, sendConfirmationMailApi, sendpassResetMail } from "../Controllers/UserConfirmatioControllers";

const EmailConfirmRoutes = express.Router();

EmailConfirmRoutes.get("/email/:confirmString", confirmEmail);
EmailConfirmRoutes.post("/password-reset/:confirmString", resetPassword);
EmailConfirmRoutes.post("/send-resetpass-mail", sendpassResetMail);
EmailConfirmRoutes.post("/resend-mail-confirmation", sendConfirmationMailApi);

export default EmailConfirmRoutes;
