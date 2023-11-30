import express from "express";
import { confirmEmail, resetPassword, sendConfirmationMailApi, sendpassResetMail } from "../Controllers/UserConfirmatioControllers";

const UserConfirmRoutes = express.Router();

UserConfirmRoutes.get("/email/:confirmString", confirmEmail);
UserConfirmRoutes.post("/password-reset/:confirmString", resetPassword);
UserConfirmRoutes.post("/send-resetpass-mail", sendpassResetMail);
UserConfirmRoutes.post("/resend-mail-confirmation", sendConfirmationMailApi);

export default UserConfirmRoutes;
