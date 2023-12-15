export interface ICreateInterviewGroup {
    recruitmentId: number;
    interviewGroupName: string;
    interviewers: number[];
}

export interface ICreateInterview {
    interviewGroupId: number;
    candidateId: number;
}