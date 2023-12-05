import configuredAxios from "../axios.config";
import { IFinishedRecruitment, IOperatingRecruitment, IOthersRecruitment, IRecruitment, IRecruitmentState, IWaitingToReviewRecruitment } from "@/models/Recruitment";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "recruitments/",
});

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});
 
export const getOperatingRecruitments = () => {
    return axios.get<IOperatingRecruitment[]>("operating");
}

export const getWaitingToReviewRecruitments = () => {
    return axios.get<IWaitingToReviewRecruitment[]>("waiting");
}

export const getFinishedRecruitments = () => {
    return axios.get<IFinishedRecruitment[]>("finished");
}

export const getOtherRecruitments = () => {
    return axios.get<IOthersRecruitment[]>("others");
}

interface ICreateRecruitmentRequest {
    recruitmentTitle: string,
    departmentId: number,
    numberOfPosition: number,
    startDate: Date,
    jobJustificationId: number,
    jobDescription: {
        qualificationId: number,
        contractTypeId: number,
        employeeRoleTypeId: number,
        experienceId: number,
        workSiteId: number,
        minSalary: number,
        maxSalary: number,
        skillIds: number[]
    }
}

export const createRecruitment = (
    request: ICreateRecruitmentRequest
) => {
    return axios.post("", request);
}

export const getRecruitmentById = (id: string | number) => {
    return axios.get<IRecruitment>(`${id}`);
}

export interface IReviewRecruitmentRequest {
    isApproved: boolean;
    description?: string;
}

export const reviewRecruitment = (id: number | string, request: IReviewRecruitmentRequest) => {
    return axios.patch(`${id}`, request);
}