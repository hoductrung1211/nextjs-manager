import ICriteria from "@/models/Criteria";
import configuredAxios from "../axios.config";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "criterias/",
});
 
export const getAllCriterias = () => {
    return axios.get<ICriteria[]>("");
}
export const getCriteriaById = (id: number) => {
    return axios.get<ICriteria>(`${id}`);
}