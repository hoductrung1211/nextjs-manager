"use client";

import IconButton from "@/components/IconButton";
import { TextField } from "@mui/material";
import { useState } from "react";

interface IPopupAddCriteriaProps {
    onSave: (skillName: string) => void;
    onCancel: () => void;
}

export default function PopupAddSkill({
    onSave,
    onCancel,
}: IPopupAddCriteriaProps) {
    const [skillName, setSkillName] = useState("");

    function handleSave() {
        onSave(skillName)
    }

    return (
        <section className="w-[800px] flex flex-col rounded-lg bg-white">
            <header className="px-8 flex items-center h-14 border-b">
                <h1 className="font-bold text-lg text-primary">
                    Thêm mới tiêu chí đánh giá
                </h1>
            </header>
            <main className="h-full flex flex-col gap-16 px-8 py-16">
                <section className="flex items-center gap-8  ">
                    <h6 className="w-80 font-semibold">
                        Tên tiêu chí đánh giá
                    </h6>
                    <TextField
                        fullWidth
                        value={skillName}
                        placeholder="Nhập tên tiêu chí đánh giá"
                        onChange={e => setSkillName(e.target.value)}
                    />
                </section>
            </main>
            <footer className="h-20 px-8 flex justify-end items-center gap-6 border-t">
                <IconButton
                    name="xmark"
                    tooltip="Hủy bỏ"
                    onClick={onCancel}
                />
                <IconButton
                    name="check"
                    tooltip="Lưu"
                    onClick={handleSave}
                />
            </footer>
        </section>
    )
}