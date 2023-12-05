import IDepartment from "./Department";
import IJobDescription from "./JobDescription";
import IJobJustification from "./JobJustification";

export interface IRecruitmentState {
    recruitmentStateId: number;
    recruitmentStateName: string;
}

export interface IFinishedRecruitment {
    recruitmentId: number;
    recruitmentTitle: string;
    department: IDepartment;
    jobJustification: IJobJustification;
    numberOfHiredApplicant: number;
    recruitmentState: IRecruitmentState;
}

export interface IOperatingRecruitment {
    recruitmentId: number;
    recruitmentTitle: string;
    department: IDepartment;
    jobJustification: IJobJustification;
    numberOfApplicant: number;
    createdDateTime: string;
    recruitmentState: IRecruitmentState;
}

export interface IOthersRecruitment {
    recruitmentId: number;
    recruitmentTitle: string;
    department: IDepartment;
    jobJustification: IJobJustification;
    description: string;
    createdDateTime: string;
    recruitmentState: IRecruitmentState;
}

export interface IWaitingToReviewRecruitment {
    recruitmentId: number;
    recruitmentTitle: string;
    department: IDepartment;
    jobJustification: IJobJustification;
    numberOfPosition: number;
    creatorName: string;
    createdDateTime: string;
}

 
export interface IRecruitment {
    recruitmentId: number;
    recruitmentTitle: string;
    jobDescription: IJobDescription;
    department: IDepartment;
    startDate: string;
    jobJustification: IJobJustification;
    numberOfPosition: number;

    // metadata
    description?: string;
    creatorId: number;
    creatorName: string;
    createdDateTime: string;
    approverId?: number;
    approverName?: number;
    recruitmentState: IRecruitmentState;
}