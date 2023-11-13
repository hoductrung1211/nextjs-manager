import axios from "./axios.config";

axios.defaults.baseURL = "https://localhost:7163/api/recruitments/";

export interface IJobDescription {
    id: number;
    recruitmentId: number;
    qualificationId: number;
    contractTypeId: number;
    employeeRoleTypeId: number;
    experienceId: number;
    workSiteId: number;
    minSalary: number;
    maxSalary: number;
}

export const getAllJobDescriptions = () => {
    return axios.get<IJobDescription[]>("");
}