import axios from "axios";
import { Contexts } from "../Contexts/Contexts";
import { LoginInputs } from "../Pages/Login/Login";
import { freelanceType } from "../../../Serveur/App/Models/Freelance";
import { clientType } from "../../../Serveur/App/Models/Clients";
import { projectType, submittersListType } from "../../../Serveur/App/Models/Project";
import { resourcesType } from "../../../Serveur/App/Models/Resources";

//  = prod ? "" : "http://localhost:3000";
const url = import.meta.env.VITE_API_URL;
const cdnRrl = import.meta.env.VITE_CDN_URL;

const baseUrl = `${url}`;
const baseUrlCDN = `${cdnRrl}`;

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
        console.log("🚀 ~ file: ApiMiddleWear.ts:33 ~ autUserVerif ~ error:", error);
    }
};

export const clientLogin = async (loginInfos: LoginInputs) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/auth/client-login`, loginInfos, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:45 ~ clientLogin ~ error:", error);
    }
};

export const freelanceLogin = async (loginInfos: LoginInputs) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/auth/freelance-login`, loginInfos, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:57 ~ freelanceLogin ~ error:", error);
    }
};

export const addResourceApi = async (resource: Partial<resourcesType>) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/resources`, resource, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:69 ~ addResourceApi ~ error:", error);
    }
};
export const getResourcesApi = async (search: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/resources${search}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:80 ~ getResourcesApi ~ error:", error);
    }
};
export const deleteResourceApi = async (id: string) => {
    try {
        const res: Response = await axios.delete(`${baseUrl}/resources/${id}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:91 ~ deleteResourceApi ~ error:", error);
    }
};

export const getMyResourcesApi = async (search: string, reqType: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/resources/my/${reqType}/${search}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:103 ~ getMyResourcesApi ~ error:", error);
    }
};

export const likeBookResourceApi = async (id: string, type: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/resources/like-book/${id}?${type}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:115 ~ likeBookResourceApi ~ error:", error);
    }
};

export const getCategoriesApi = async () => {
    try {
        const res: Response = await axios.get(`${baseUrl}/utils/resource-categories`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:127 ~ getCategoriesApi ~ error:", error);
    }
};
export const getFreelanceInfospi = async (id?: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/account/freelance/${id ? id : ""}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:138 ~ getFreelanceInfospi ~ error:", error);
    }
};
export const getClientInfospi = async (id?: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/account/client/${id ? id : ""}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:149 ~ getClientInfospi ~ error:", error);
    }
};
export const editFreelanceApi = async (id: string, payload: Partial<freelanceType>) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/account/freelance/edit/${id}`, payload, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:160 ~ editFreelanceApi ~ error:", error);
    }
};
export const editClientApi = async (id: string, payload: Partial<clientType>) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/account/client/edit/${id}`, payload, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:171 ~ editClientApi ~ error:", error);
    }
};

export const uploadMedia = async (payload: any) => {
    try {
        const res: Response = await axios.post(`${baseUrlCDN}/cdn/add`, payload, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:183 ~ uploadMedia ~ error:", error);
    }
};
export const uploadFile = async (payload: any) => {
    try {
        const res: Response = await axios.post(`${baseUrlCDN}/cdn/files`, payload, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:194 ~ uploadFile ~ error:", error);
    }
};

export const getUtilsApi = async (utilType: string, search?: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/utils/${utilType}${search ? search : ""}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:206 ~ getUtilsApi ~ error:", error);
    }
};
export const getProjectsApi = async (search?: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/projects${search ? search : ""}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:217 ~ getProjectsApi ~ error:", error);
    }
};
export const createProjectApi = async (project: Partial<projectType>) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/projects/`, project, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:228 ~ createProjectApi ~ error:", error);
    }
};
export const editProjectApi = async (edited: Partial<projectType>, id: string) => {
    try {
        const { search } = window.location;
        const res: Response = await axios.post(`${baseUrl}/projects/edit/${id}${search ? search : ""}`, edited, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:240 ~ editProjectApi ~ error:", error);
    }
};

export const submitOfferToProjectApi = async (offer: Partial<submittersListType>, id: string) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/projects/submit/${id}`, offer, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:252 ~ submitOfferToProjectApi ~ error:", error);
    }
};

export const getProjectdetailsApi = async (id: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/projects/${id}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:264 ~ getProjectdetailsApi ~ error:", error);
    }
};
export const getInvoicesApi = async (search: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/invoices/${search ? search : ""}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:275 ~ getInvoicesApi ~ error:", error);
    }
};
export const getInvoiceDetailApi = async (id: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/invoices/${id}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:275 ~ getInvoicesApi ~ error:", error);
    }
};
export const registerFreelanceApi = async (infos: Partial<freelanceType>) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/auth/freelance-register`, infos, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:297 ~ registerFreelanceApi ~ error:", error);
    }
};
export const registerClientApi = async (infos: Partial<clientType>) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/auth/client-register`, infos, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:308 ~ registerClientApi ~ error:", error);
    }
};
export const confirmMailApi = async (confirmStr: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/confirmation/email/${confirmStr}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:308 ~ registerClientApi ~ error:", error);
    }
};
