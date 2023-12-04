import configuredAxios from "../axios.config";
import IQualification from "@/models/Qualification";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "qualifications/",
});
  
export const getAllQualifications = () => {
    return axios.get<IQualification[]>("");
}
export const getQualificationById = (id: number) => {
    return axios.get<IQualification>(`${id}`);
}