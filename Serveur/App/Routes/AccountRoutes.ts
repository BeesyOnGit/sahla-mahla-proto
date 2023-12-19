import express from "express";
import { AuthVerification } from "../MiddleWear/ServerFunctions";
import {
    deleteClientAccount,
    deleteFreelanceAccount,
    editClientInfos,
    editFreelanceInfos,
    getClientAccount,
    getFreelanceAccount,
} from "../Controllers/AccountControlers";
const AccountRoutes = express.Router();

AccountRoutes.post("/freelance/edit/:id", AuthVerification, editFreelanceInfos);
AccountRoutes.delete("/freelance/:id", AuthVerification, deleteFreelanceAccount);
AccountRoutes.post("/client/edit/:id", AuthVerification, editClientInfos);
AccountRoutes.delete("/client/:id", AuthVerification, deleteClientAccount);
AccountRoutes.get("/freelance/:id?", AuthVerification, getFreelanceAccount);
AccountRoutes.get("/client/:id?", AuthVerification, getClientAccount);

export default AccountRoutes;
