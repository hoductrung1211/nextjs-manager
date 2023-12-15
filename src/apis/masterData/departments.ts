import IDepartment from "@/models/Department";
import configuredAxios from "../axios.config";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "departments/",
});
 
export const getAllDepartments = () => {
    return axios.get<IDepartment[]>("");
}
export const getDepartmentById = (id: number) => {
    return axios.get<IDepartment>(`${id}`);
}
