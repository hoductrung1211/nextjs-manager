import ICandidate from "./Candidate";
import IInterviewEvaluation from "./InterviewEvaluation";

export default interface IInterview {
    interviewId: number;
    interviewGroupId: number;
    candidate: ICandidate;

    dateTime: string;
    interviewStatus: IInterviewStatus; 

    // Need to be updated more
    interviewEvaluation?: IInterviewEvaluation;
}

export interface IInterviewStatus {
    interviewStatusId: number;
    interviewStatusName: string;
}

export const enum InterviewStatus {
    Pending = 1,
    CandidateIsAbsent,
    Done,
    Cancel,
}