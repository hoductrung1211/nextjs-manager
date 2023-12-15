import IEmployee from "@/models/Employee";
import configuredAxios from "../axios.config";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "employees/",
});

export const getAllEmployees = () => {
    return axios.get<IEmployee[]>("");
}