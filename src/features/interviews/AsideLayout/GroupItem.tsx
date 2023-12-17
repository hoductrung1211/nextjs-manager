"use client";
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import { IInterviewGroupOverview } from "@/models/InterviewGroup";

interface IGroupItemProps {
    interviewGroup: IInterviewGroupOverview;
    onViewClick: () => void;
}

export default function GroupItem({
    interviewGroup,
    onViewClick,
}: IGroupItemProps) {
    const {
        interviewGroupId,
        interviewGroupName,
        interviewers,
        numberOfInterviews
    } = interviewGroup;

    return (
        <section className="px-4 py-2 flex flex-col gap-1 border rounded-md bg-white">
            <header className="flex items-center justify-between">
                <h3 className="text-lg">{interviewGroupName}</h3>
                <IconButton
                    className="-mr-2 "
                    name="up-right-from-square"
                    onClick={onViewClick}
                    tooltip="Xem chi tiết"
                />
            </header>
            <main className="p-4 px-2 flex flex-col gap-4 bg-gray-50 rounded-md border">
                {
                    interviewers.map(interviewer => (
                        <div key={interviewer.employeeId} className="grid grid-cols-10 gap-1">
                            <Icon className="text-center" name="user" />
                            <p className="col-span-9 font-semibold">
                                {interviewer.fullName}
                                <span className="text-apple-gray">
                                    {" "}#{interviewer.employeeId}
                                </span>
                            </p>
                            <p></p>
                            <p className="col-span-4 text-apple-gray">{interviewer.employeeRoleType.employeeRoleTypeName}</p>
                            <p className="col-span-4 text-apple-gray">Phòng ban: {interviewer.department.departmentName}</p>
                        </div>
                    ))
                }

            </main>
            <footer className="py-2 text-apple-gray">
                Số lượng buổi phỏng vấn: {" "}
                <span className="font-semibold">
                    {numberOfInterviews}
                </span>
            </footer>
        </section>
    )
}