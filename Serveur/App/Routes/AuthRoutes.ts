import express from "express";
import { showRoomLogin } from "../Controllers/AuthControllers";
import { AuthVerification } from "../MiddleWear/ServerFunctions";
const AuthRoutes = express.Router();

AuthRoutes.post("/sellerlogin/", showRoomLogin);

export default AuthRoutes;
