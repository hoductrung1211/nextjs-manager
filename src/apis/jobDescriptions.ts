import configuredAxios from "./axios.config";

const axios = configuredAxios.create();

const baseURL = "jobDescriptions";

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
    return axios.get<IJobDescription[]>(`${baseURL}`);
}