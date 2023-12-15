import ICandidate from "./Candidate";

export default interface IInterview {
    interviewId: number;
    interviewGroupId: number;
    candidate: ICandidate;
    dateTime: Date;
    interviewStatus: IInterviewStatus; 
}

export interface IInterviewStatus {
    interviewStatusId: number;
    interviewStatusName: string;
}