import ISkillCategory from "@/models/SkillCategory";
import configuredAxios from "../axios.config";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "skillCategories/",
});
  
export const getAllSkillCategories = () => {
    return axios.get<ISkillCategory[]>("");
}
export const getSkillCategoryById = (id: number) => {
    return axios.get<ISkillCategory>(`${id}`);
}

