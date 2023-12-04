import configuredAxios from "../axios.config";
import ISkill from "@/models/Skill";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "skills/",
});
  
export const getAllSkills = () => {
    return axios.get<ISkill[]>("");
}
export const getSkillById = (id: number) => {
    return axios.get<ISkill>(`${id}`);
}

