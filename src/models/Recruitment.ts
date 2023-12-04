import IDepartment from "./Department";
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
    createdDateTime: Date;
    recruitmentState: IRecruitmentState;
}

export interface IOthersRecruitment {
    recruitmentId: number;
    recruitmentTitle: string;
    department: IDepartment;
    jobJustification: IJobJustification;
    description: string;
    createdDateTime: Date;
    recruitmentState: IRecruitmentState;
}

export interface IWaitingToReviewRecruitment {
    recruitmentId: number;
    recruitmentTitle: string;
    department: IDepartment;
    jobJustification: IJobJustification;
    numberOfPosition: number;
    creatorName: string;
    createdDateTime: Date;
}