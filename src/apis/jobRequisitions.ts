import configuredAxios from "./axios.config";

const axios = configuredAxios.create();

const baseURL = "jobRequisitions";

export interface IJobRequisition {
    jobRequisitionId: number;
    recruitmentId: number;
    positionTitle: string;
    departmentId: number;
    departmentName: string;
    numberOfPosition: number;
    startDate: Date;
    requisitionReasonId: number;
    requisitionReasonName: string;
    recruitmentStateId: number;
    recruitmentStateName: string;
    hrId: number;
    hrName: string;
    hiringManagerId: number | null;
    hiringManagerName: string | null;
    createdDateTime: Date;
}

export enum JobRequisitionFilter {
    operating,
    waitingToReview,
    finished,
    others
}

export const getAllJobRequisitions = (filter?: JobRequisitionFilter) => {
    return axios.get<IJobRequisition[]>(baseURL, {
        params: {
            filter
        }
    });
}

export const getJobRequisitionById = (id: number) => {
    return axios.get<IJobRequisition>(`${baseURL}/${id}`);
}

export const deleteJobRequisition = (id: number) => {
    return axios.delete(`${baseURL}/${id}`);
}