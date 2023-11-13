import axios from "./axios.config";

axios.defaults.baseURL = "https://localhost:7163/api/recruitments/";

export interface IRecruitment {
    id: number;
    jobRequisitionId: number;
    jobDescriptionId: number;
    interviewGroupId: number;
    statusId: number;
}

export const getAllRecruitments = () => {
    return axios.get<IRecruitment[]>("");
}

export const getRecruitmentById = (id: number) => {
    return axios.get<IRecruitment>(`/${id}`);
}

export interface ICreateRecruitment {
    jobRequisition: ICreateJobRequisition;
    jobDescription: ICreateJobDescription;
}

export interface ICreateJobRequisition {
    positionTitle: string;
    departmentId: number;
    numberOfPosition: number;
    startDate: Date;
    requisitionReasonId: number;
}

export interface ICreateJobDescription {
    qualificationId: number;
    contractTypeId: number;
    employeeRoleTypeId: number;
    experienceId: number;
    workSiteId: number;
    minSalary: number;
    maxSalary: number;
}