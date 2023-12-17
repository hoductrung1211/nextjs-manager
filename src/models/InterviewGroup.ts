import IEmployee from "./Employee";
import IInterview from "./Interview";

export default interface IInterviewGroup {
    interviewGroupId: number;
    interviewGroupName: string;
    recruitmentId: number;

    interviewers: IEmployee[];
    interviews: IInterview[];
}

export interface IInterviewGroupOverview {
    interviewGroupId: number;
    interviewGroupName: string;
    recruitmentId: number;

    interviewers: IEmployee[];
    numberOfInterviews: number;
}