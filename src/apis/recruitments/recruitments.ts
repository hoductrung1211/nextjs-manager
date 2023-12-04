import ICriteria from "@/models/Criteria";
import configuredAxios from "../axios.config";
import ISkill from "@/models/Skill";
import { IFinishedRecruitment, IOperatingRecruitment, IOthersRecruitment, IWaitingToReviewRecruitment } from "@/models/Recruitment";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "recruitments",
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


export const createRecruitment = (
    positionTitle: string,
    departmentId: number,
    numberOfPosition: number,
    startDate: Date,
    jobJustificationId: number,
    qualificationId: number,
    contractTypeId: number,
    employeeRoleTypeId: number,
    experienceId: number,
    workSiteId: number,
    minSalary: number,
    maxSalary: number,
    skillIds: number[]
) => {
    return axios.post("", {
        positionTitle,
        departmentId,
        numberOfPosition,
        startDate,
        jobJustificationId,
        qualificationId,
        contractTypeId,
        employeeRoleTypeId,
        experienceId,
        workSiteId,
        minSalary,
        maxSalary,
        skillIds,
    } );
}

export interface IJobRequsition {
    recruitmentTitle: string;
    departmentName: string;
    numberOfPosition: number;
    startDate: Date;
    jobJustification: string;
    criterias: ICriteria[]
}

export interface IJobDescripion {
    qualificationName: string;
    contractTypeName: string;
    employeeRoleName: string;
    experienceName: string;
    workSiteName: string;
    minSalary: number;
    maxSalary: number;
    skills: ISkill[];
}

export interface IRecruitmentInfo {
    recruitmentId: number;
    recruitmentStateName: string;
    numberOfCandidates: number; // TODO: Fix this
    recruitmentMilestones: {
        actor: string;
        action: string;
        time: Date;
    }[]
}

export interface IDetailRecruitment {
    jobRequisition: IJobRequsition,
    jobDescription: IJobDescripion,
    recruitmentInfo: IRecruitmentInfo,
}

export const getRecruitmentById = (id: string | number) => {
    return axios.get<IDetailRecruitment>(`/${id}`);
}