import axios from "axios";
import { Contexts } from "../Contexts/Contexts";
import { LoginInputs } from "../Pages/Login/Login";

//  = prod ? "" : "http://localhost:3000";
const url = import.meta.env.VITE_API_URL;

const baseUrl = `${url}`;

const authorizationToken = window.localStorage.user_token;
const headers = { authorizationToken };
const config = { headers };

interface Response {
    code: string;
    data: object;
}

export const autUserVerif = async () => {
    try {
        const res = await axios.get(`${baseUrl}/auth/check`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:36 ~ autUserVerif ~ error:", error);
    }
};

export const clientLogin = async (loginInfos: LoginInputs) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/auth/client-login`, loginInfos, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:39 ~ clientLogin ~ error:", error);
    }
};
export const freelanceLogin = async (loginInfos: LoginInputs) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/auth/freelance-login`, loginInfos, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:50 ~ freelanceLogin ~ error:", error);
    }
};

export const getResourcesApi = async (search: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/resources${search}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:50 ~ freelanceLogin ~ error:", error);
    }
};
export const likeBookResourceApi = async (id: string, type: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/resources/like-book/${id}?${type}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:50 ~ freelanceLogin ~ error:", error);
    }
};
export const getCategoriesApi = async () => {
    try {
        const res: Response = await axios.get(`${baseUrl}/utils/resource-categories`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:50 ~ freelanceLogin ~ error:", error);
    }
};
