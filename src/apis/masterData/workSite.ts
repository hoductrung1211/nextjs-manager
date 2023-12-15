import IWorkSite from "@/models/WorkSite";
import configuredAxios from "../axios.config";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "workSites/",
});
 
export const getAllWorkSites = () => {
    return axios.get<IWorkSite[]>("");
}
export const getWorkSiteById = (id: number) => {
    return axios.get<IWorkSite>(`${id}`);
}
