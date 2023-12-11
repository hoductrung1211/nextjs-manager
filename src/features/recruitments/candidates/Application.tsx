"use client";
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import IApplicationSubmission from "@/models/ApplicationSubmission";
import IJobDescription from "@/models/JobDescription";
import { getStandardVNLocaleDateString } from "@/utils/functions/getLocaleDateString";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

interface IApplicationProps {
    application: IApplicationSubmission;
    jobDescription: IJobDescription;
    onClickApplication: (application: IApplicationSubmission) => void;
}

export default function Application({
    application,
    jobDescription: {
        skills,
        experience,
        qualification
    },
    onClickApplication,
}: IApplicationProps) {

    const [userFields, setUserFields] = useState<{
        title: string;
        value: string;
    }[]>([]);

    const [candidateFields, setCandidateFields] = useState<{
        icon: string;
        title: string;
        value: string;
        estimate: string;
    }[]>([]);

    useEffect(() => {
        setUserFields([
            {
                title: "Ngày sinh",
                value: getStandardVNLocaleDateString(application.candidate.user.dateOfBirth),
            },
            {
                title: "Giới tính",
                value: application.candidate.user.sex ? "Nam" : "Nữ",
            },
            {
                title: "Trạng thái",
                value: application.applicationStatus.applicationStatusName,
            },
        ]);

        const qualificationEstimate =
            application.candidate.qualification.qualificationValue
                >= (qualification.qualificationValue ?? 0)
                ? "Đạt"
                : "Chưa đạt";

        const experienceEstimate = 
            application.candidate.experience.value
                >= (experience.value ?? 0)
                ? "Đạt"
                : "Chưa đạt";
        
        let validSkills = 0;
        skills.forEach(skill => {
            const foundSkill = application.candidate.skills.find(s => s.skillId == skill.skillId);
            foundSkill && validSkills++;
        });

        const skillEstimate = Math.round(validSkills / skills.length * 100)  + "% trùng khớp";

        setCandidateFields([
            {
                icon: "school",
                title: "Trường",
                value: application.candidate.school ?? "",
                estimate: "",
            },
            {
                icon: "user-graduate",
                title: "Bằng cấp",
                value: application.candidate.qualification.qualificationName,
                estimate: qualificationEstimate,
            },
            {
                icon: "chart-simple",
                title: "Kinh nghiệm",
                value: application.candidate.experience.experienceName,
                estimate: experienceEstimate,
            },
            {
                icon: "award",
                title: "Kỹ năng",
                value: application.candidate.skills.length + " kỹ năng",
                estimate: skillEstimate,
            },
        ]);
    }, []);

    return (
        <section className="p-3 flex flex-col gap-4 border rounded-md bg-white shadow-sm">
            <header className=" pl-2 flex justify-between">
                <div className=" pt-2 flex gap-4">
                    <Avatar>{application.candidate.user.firstName[0]}</Avatar>
                    <div className="flex flex-col gap-1 ">
                        <h6 className=" font-semibold cursor-pointer">{application.candidate.user.firstName} {application.candidate.user.lastName}</h6>
                        {
                            userFields.map(info => (
                                <div className="flex items-center text-apple-gray">
                                    <p className="w-24 font-semibold">{info.title}</p>
                                    {info.value}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <IconButton
                    className="h-fit rounded-md"
                    name="up-right-from-square"
                    tooltip="Xem chi tiết"
                    onClick={() => {
                        onClickApplication(application);
                        window.scrollTo(0, 0);
                    }}
                />
            </header>
            <main className="p-3 flex flex-col gap-3 bg-gray-100 rounded-md">
                {candidateFields.map(info => (
                    <div className="flex px-1">
                        <p className="flex-shrink-0 w-36 flex items-center gap-2 font-semibold">
                            <div className="w-5 grid place-items-center">
                                <Icon name={info.icon} />
                            </div>
                            {info.title}
                        </p>
                        <p className="w-full">{info.value}</p>
                        <p className="flex-shrink-0 font-semibold">{info.estimate}</p>
                    </div>
                ))}
            </main>
        </section>
    )
}