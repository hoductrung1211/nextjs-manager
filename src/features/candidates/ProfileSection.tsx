"use client";
import Field from "@/components/Field";
import ICandidate from "@/models/Candidate";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";

interface IProfileSectionProps {
    candidate?: ICandidate;
}

export default function ProfileSection({
    candidate,
}: IProfileSectionProps) {

    const [profile, setProfile] = useState<{
        label: string;
        value: string | {
            id: number;
            text: string;
        }[]
    }[]>([]);

    useEffect(() => {
        candidate && setProfile([
            {
                label: "Giới thiệu bản thân",
                value: candidate.bio ?? "",
            },
            {
                label: "Bằng cấp",
                value: candidate.qualification.qualificationName,
            },
            {
                label: "Kinh nghiệm",
                value: candidate.experience.experienceName,
            },
            {
                label: "Trường học",
                value: candidate.school ?? "",
            },
            {
                label: "Kỹ năng",
                value: candidate.skills.map(skill => ({
                    id: skill.skillId,
                    text: skill.skillName,
                }))
            }
        ]);
    }, []);

    return (
        <section className="py-4 px-6 flex flex-col gap-4 bg-white rounded-md border">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg text-primary">Hồ sơ</h2>
            </div>
            {
                profile.map(field => (
                    <Field label={field.label} align="start">
                        {
                            typeof field.value == "string" ?
                                field.value :
                                <div className="flex flex-wrap gap-4">
                                    {
                                        field.value.map(val => (
                                            <Chip key={val.id} label={val.text} />
                                        ))
                                    }
                                </div>
                        }
                    </Field>
                ))
            }
        </section>
    )
}