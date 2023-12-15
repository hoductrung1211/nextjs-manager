"use client";

import Field from "@/components/Field";
import ICandidate from "@/models/Candidate";
import { useEffect, useState } from "react";

interface IPersonalInfoSectionProps {
    candidate?: ICandidate;
}

export default function PersonalInfoSection({
    candidate
}: IPersonalInfoSectionProps) {
    const [personalInfo, setPersonalInfo] = useState<{ label: string; value: string; }[]>([]);

    useEffect(() => {
        candidate && setPersonalInfo([
            {
                label: "Họ và tên",
                value: candidate.user.firstName + " " + candidate.user.lastName,
            },
            {
                label: "Ngày sinh",
                value: new Date(candidate.user.dateOfBirth ?? "").toLocaleDateString("vi-VN", {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }),
            },
            {
                label: "Giới tính",
                value: candidate.user.sex ? "Nam" : "Nữ",
            },
            {
                label: "Quê quán",
                value: candidate.user.placeOfOrigin,
            },
            {
                label: "Địa chỉ",
                value: candidate.user.address,
            },
            {
                label: "Số CMND/Thẻ căn cước",
                value: candidate.user.identityCard,
            },
            {
                label: "Email",
                value: candidate.user.email,
            },
            {
                label: "Số điện thoại",
                value: candidate.user.phoneNumber,
            },
        ]);
    }, []);

    return (
        <section className="py-4 px-6 flex flex-col gap-4 bg-white rounded-md border">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-primary">Thông tin cá nhân</h2>
            </div>
            {
                personalInfo.map(field => (
                    <Field label={field.label}>
                        {field.value}
                    </Field>
                ))
            }
        </section>
    )
}