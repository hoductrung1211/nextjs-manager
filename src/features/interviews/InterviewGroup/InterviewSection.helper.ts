import IInterview from "@/models/Interview";
import { InterviewSectionFilter } from "../constants";

export function renderFilterTab(interviews: IInterview[]) {
    let numberOfPending = 0;
    let numberOfInterviewed = 0;
    let numberOfNotPresent = 0;

    interviews.forEach(interview => {
        switch (interview.interviewStatus.interviewStatusId) {
            case InterviewSectionFilter.Pending:
                numberOfPending++;
                return;
            case InterviewSectionFilter.Interviewed:
                numberOfInterviewed++;
                return;
            case InterviewSectionFilter.NotPresent:
                numberOfNotPresent++;
                return;
            default:
        }
    });

    return [
        {
            label: "Tổng " + interviews.length,
            value: InterviewSectionFilter.All,
        },
        {
            label: "Chờ phỏng vấn " + numberOfPending,
            value: InterviewSectionFilter.Pending,
        },
        {
            label: "Đã phỏng vấn " + numberOfInterviewed,
            value: InterviewSectionFilter.Interviewed,
        },
        {
            label: "Vắng mặt " + numberOfNotPresent,
            value: InterviewSectionFilter.NotPresent,
        },
    ];
}
