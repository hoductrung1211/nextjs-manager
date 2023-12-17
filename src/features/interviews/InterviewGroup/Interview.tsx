"use client";
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import IInterview from "@/models/Interview";
import { countAge, getVNLocaleDateString, getVNLocaleDateTimeString } from "@/utils/functions/dateTimeHelper";
import { useState } from "react";

interface IInterviewProps {
    interview: IInterview
}

export default function Interview({
    interview
}: IInterviewProps) {
    const {
        candidate,
        dateTime,
        interviewStatus,
        interviewEvaluation
    } = interview;
    const [personalInfo, setPersonalInfo] = useState([
        {
            icon: "calendar",
            label: "Ngày sinh",
            value: getVNLocaleDateString(candidate.user.dateOfBirth) + " (" + countAge(candidate.user.dateOfBirth) + " tuổi)",
        },
        {
            icon: "venus-mars",
            label: "Giới tính",
            value: candidate.user.sex ? "Nam" : "Nữ"
        },
        {
            icon: "school",
            label: "Trường",
            value: candidate.school + ""
        },
        {
            icon: "user-graduate",
            label: "Bằng cấp",
            value: candidate.qualification.qualificationName,
        },
        {
            icon: "chart-simple",
            label: "Kinh nghiệm",
            value: candidate.experience.experienceName,
        },
        {
            icon: "award",
            label: "Kỹ năng",
            value: candidate.skills.length
        },
    ]);

    const interviewInfo = [
        {
            icon: "user",
            value: candidate.user.firstName + " " + candidate.user.lastName,
        },
        {
            icon: "calendar",
            value: getVNLocaleDateTimeString(dateTime)
        },
        {
            icon: "circle-nodes",
            value: interviewStatus.interviewStatusName
        },
    ];

    return (
        <section className="p-2 flex flex-col gap-2 border rounded-md shadow-sm bg-white">
            <header className="flex justify-between">
                <section className="pl-4 flex gap-12">
                    {interviewInfo.map(info => (
                        <div className="flex items-center gap-2">
                            <Icon className="inline-block w-6" name={info.icon} />
                            <p>{info.value}</p>
                        </div>
                    ))}
                </section>
                <section className="flex-shrink-0 flex gap-2">
                    <IconButton
                        name="edit"
                        tooltip="Chỉnh sửa"
                    />
                    <IconButton
                        name="calendar-check"
                        tooltip="Đánh dấu ứng viên tham dự phỏng vấn"
                    />
                    <IconButton
                        name="calendar-xmark"
                        tooltip="Đánh dấu ứng viên vắng mặt"
                    />
                    {/* <IconButton
                        name="marker"
                        tooltip="Đánh giá ứng viên"
                    /> */}
                    <IconButton
                        name="trash"
                        tooltip="Xóa buổi phỏng vấn"
                    />
                </section>
            </header>
            <section>
                <div className="p-4 w-full flex flex-col gap-4 border bg-gray-50 rounded-md">
                    {personalInfo.map(info => (
                        <div className="flex gap-2 text-gray-600">
                            <Icon className="inline-block w-6" name={info.icon} />
                            <p className="w-28 font-semibold">{info.label}</p>
                            {info.value}
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}