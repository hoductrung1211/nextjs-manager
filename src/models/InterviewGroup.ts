import IEmployee from "./Employee";
import IInterview from "./Interview";

export default interface IInterviewGroup {
    interviewGroupId: number;
    interviewGroupName: string;
    recruitmentId: number;

    interviewers: IEmployee[];
    interviews: IInterview[];
}