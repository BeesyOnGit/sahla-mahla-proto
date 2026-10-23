import express from "express";
import { clientLogin, clientRegister, demoCredentials, freelanceLogin, freelanceRegister, userAuth } from "../Controllers/AuthControllers";
// import { AuthVerification } from "../MiddleWear/ServerFunctions";
const AuthRoutes = express.Router();

AuthRoutes.post("/freelance-register/", freelanceRegister);
AuthRoutes.post("/freelance-login/", freelanceLogin);
AuthRoutes.post("/client-login/", clientLogin);
AuthRoutes.post("/client-register/", clientRegister);
AuthRoutes.get("/check/", userAuth);
AuthRoutes.get("/demo/", demoCredentials);

export default AuthRoutes;
