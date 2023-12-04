import IEmployeeRoleType from "@/models/EmployeeRoleType";
import configuredAxios from "../axios.config";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "employeeRoleTypes/",
});
 
export const getAllEmployeeRoleTypes = () => {
    return axios.get<IEmployeeRoleType[]>("");
}
export const getEmployeeRoleTypeById = (id: number) => {
    return axios.get<IEmployeeRoleType>(`${id}`);
}
