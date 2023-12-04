import IExperience from "@/models/Experience";
import configuredAxios from "../axios.config";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "experiences/",
});
 
export const getAllExperiences = () => {
    return axios.get<IExperience[]>("");
}
export const getExperienceById = (id: number) => {
    return axios.get<IExperience>(`${id}`);
}
