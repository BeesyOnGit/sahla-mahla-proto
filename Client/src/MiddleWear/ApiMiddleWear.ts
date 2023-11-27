import axios from "axios";
import { Contexts } from "../Contexts/Contexts";

//  = prod ? "" : "http://localhost:3000";
const url = import.meta.env.VITE_API_URL;

const baseUrl = `${url}/api`;

const authorizationToken = window.localStorage.user_token;
const headers = { authorizationToken };
const config = { headers };

interface Response {
    code: string;
    data: object;
}

export const autUserVerif = async () => {
    try {
        const res = await axios.get(`${baseUrl}/auth/tokenValidation`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:36 ~ autUserVerif ~ error:", error);
    }
};

export const getCarDetail = async (productCode: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/cars/detail/${productCode}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:8 ~ getcarsFeed ~ error:", error);
    }
};
