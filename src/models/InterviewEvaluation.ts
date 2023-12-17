import ICriteria from "./Criteria";

export default interface IInterviewEvaluation {
    interviewId: number;
    criteria: ICriteria;
    mark: number;
    comment: string;
}