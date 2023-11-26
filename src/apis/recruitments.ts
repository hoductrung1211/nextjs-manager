import configuredAxios from "./axios.config";

const axios = configuredAxios.create();
axios.defaults.baseURL = axios.defaults.baseURL + "recruitments/";

export interface IConciseRecruitment {
    recruitmentId: number;
    recruitmentTitle: string;
    departmentId: number;
    departmentName: string;
    jobJustificationName: string;
    numberOfPosition: number;
    numberOfApplicant: number;
    numberOfHiredApplicant: number;
    creatorName: string;
    createdTime: Date;
    finishedTime: Date;
    description: string;
    recruitmentStateId: number;
    recruitmentStateName: string;
}

export enum RecruitmentFilter {
    Operating,
    WaitingToReview,
    Finished,
    Others
}

export const getAllRecruitments = (filter?: RecruitmentFilter) => {
    return axios.get<IConciseRecruitment[]>("", {
        params: {
            filter
        }
    });
}
 