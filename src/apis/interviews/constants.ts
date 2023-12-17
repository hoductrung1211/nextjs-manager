export interface ICreateInterviewGroup {
    recruitmentId: number;
    interviewGroupName: string;
    interviewers: number[];
}

export interface ICreateInterview {
    interviewGroupId: number;
    candidateId: number;
    dateTime: Date;
}

export interface IUpdateInterviewGroup {
    interviewGroupName?: string;
    interviewers?: number[];
}

export interface IUpdateInterviewInfo {
    candidateId?: number;
    dateTime?: Date;
}

export interface IUpdateInterviewStatus {
    interviewStatusId?: number;
}