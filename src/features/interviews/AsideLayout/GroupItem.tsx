"use client";
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";

interface IGroupItemProps {
    onViewInterviewGroup: () => void;
}

export default function GroupItem({
    onViewInterviewGroup
}: IGroupItemProps) {
    const interviewers = [
        {
            id: 1,
            name: "Ho Duc Trung",
            employeeRoleType: "HR",
            department: "HR"
        },
        {
            id: 2,
            name: "Bui Thi Ly",
            employeeRoleType: "Front-end Developer",
            department: "IT"
        },
    ];

    return (
        <section className="px-4 py-2 flex flex-col gap-1 border rounded-md bg-white">
            <header className="flex items-center justify-between">
                <h3 className="font-semibold">Tên nhóm</h3>
                <IconButton
                    className="-mr-2 "
                    name="up-right-from-square"
                    onClick={onViewInterviewGroup}
                    tooltip="Xem chi tiết"
                />
            </header>
            <main className="p-4 px-2 flex flex-col gap-4 font-semibold bg-gray-50 rounded-md border">
                {
                    interviewers.map(interviewer => (
                        <div key={interviewer.id} className="grid grid-cols-10">
                            <Icon className="text-center" name="user" />
                            <p className="col-span-9">
                                {interviewer.name}
                                <span className="text-apple-gray">
                                    {" "}#{interviewer.id}
                                </span>
                            </p>
                            <p></p>
                            <p className="col-span-4 text-apple-gray">{interviewer.employeeRoleType}</p>
                            <p className="col-span-4 text-apple-gray">{interviewer.department}</p>
                        </div>
                    ))
                }

            </main>
            <footer className="py-2 text-apple-gray">
                Số lượng buổi phỏng vấn: <span className="font-semibold">3</span>
            </footer>
        </section>
    )
}