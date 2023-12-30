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
        console.log("🚀 ~ file: ApiMiddleWear.ts:51 ~ freelanceLogin ~ error:", error);
    }
};

export const addResourceApi = async (resource: Partial<resourcesType>) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/resources`, resource, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:68 ~ getResourcesApi ~ error:", error);
    }
};
export const getResourcesApi = async (search: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/resources${search}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:63 ~ getResourcesApi ~ error:", error);
    }
};
export const deleteResourceApi = async (id: string) => {
    try {
        const res: Response = await axios.delete(`${baseUrl}/resources/${id}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:63 ~ getResourcesApi ~ error:", error);
    }
};

export const getMyResourcesApi = async (search: string, reqType: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/resources/my/${reqType}/${search}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:75 ~ getMyResourcesApi ~ error:", error);
    }
};

export const likeBookResourceApi = async (id: string, type: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/resources/like-book/${id}?${type}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:87 ~ likeBookResourceApi ~ error:", error);
    }
};

export const getCategoriesApi = async () => {
    try {
        const res: Response = await axios.get(`${baseUrl}/utils/resource-categories`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:99 ~ getCategoriesApi ~ error:", error);
    }
};
export const getFreelanceInfospi = async (id?: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/account/freelance/${id ? id : ""}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:110 ~ getFreelanceInfospi ~ error:", error);
    }
};
export const getClientInfospi = async (id?: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/account/client/${id ? id : ""}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:110 ~ getFreelanceInfospi ~ error:", error);
    }
};
export const editFreelanceApi = async (id: string, payload: Partial<freelanceType>) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/account/freelance/edit/${id}`, payload, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:133 ~ editFreelanceApi ~ error:", error);
    }
};
export const editClientApi = async (id: string, payload: Partial<clientType>) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/account/client/edit/${id}`, payload, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:133 ~ editFreelanceApi ~ error:", error);
    }
};

export const uploadMedia = async (payload: any) => {
    try {
        const res: Response = await axios.post(`${baseUrlCDN}/cdn/add`, payload, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:133 ~ editFreelanceApi ~ error:", error);
    }
};
export const uploadFile = async (payload: any) => {
    try {
        const res: Response = await axios.post(`${baseUrlCDN}/cdn/files`, payload, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:133 ~ editFreelanceApi ~ error:", error);
    }
};

export const getUtilsApi = async (utilType: string, search?: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/utils/${utilType}${search ? search : ""}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:111 ~ getUtilsApi ~ error:", error);
    }
};
export const getProjectsApi = async (search?: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/projects${search ? search : ""}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:182 ~ getProjectsApi ~ error:", error);
    }
};
export const createProjectApi = async (project: Partial<projectType>) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/projects/`, project, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:182 ~ getProjectsApi ~ error:", error);
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
        console.log("🚀 ~ file: ApiMiddleWear.ts:182 ~ getProjectsApi ~ error:", error);
    }
};

export const submitOfferToProjectApi = async (offer: Partial<submittersListType>, id: string) => {
    try {
        const res: Response = await axios.post(`${baseUrl}/projects/submit/${id}`, offer, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:182 ~ getProjectsApi ~ error:", error);
    }
};

export const getProjectdetailsApi = async (id: string) => {
    try {
        const res: Response = await axios.get(`${baseUrl}/projects/${id}`, config);

        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log("🚀 ~ file: ApiMiddleWear.ts:182 ~ getProjectsApi ~ error:", error);
    }
};
