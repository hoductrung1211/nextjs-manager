"use client";

import IconButton from "@/components/IconButton";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { ISkillData } from "./config";

interface IPopupEditSkillProps {
    skill: ISkillData;
    onSave: (skill: ISkillData) => void;
    onCancel: () => void;
}

export default function PopupEditSkill({
    skill: {
        skillId,
        skillName: initSkillName,
        isDeleted: initIsDeleted,
    },
    onSave,
    onCancel,
}: IPopupEditSkillProps) {
    const [skillName, setSkillName] = useState(initSkillName);
    const [isDeleted, setIsDeleted] = useState(initIsDeleted);

    function handleSave() {
        onSave({
            skillId,
            skillName,
            isDeleted,
        })
    }

    return (
        <section className="w-[800px] flex flex-col rounded-lg bg-white">
            <header className="px-8 flex items-center h-14 border-b">
                <h1 className="font-bold text-lg text-primary">
                    Chỉnh sửa kỹ năng
                </h1>
            </header>
            <main className="h-full flex flex-col gap-16 px-8 py-16">
                <section className="flex items-center gap-8  ">
                    <h6 className="w-80 font-semibold">
                        Tên kỹ năng
                    </h6>
                    <TextField
                        fullWidth
                        value={skillName}
                        placeholder="Nhập tên kỹ năng"
                        onChange={e => setSkillName(e.target.value)}
                    />
                </section>
                <section className="flex items-center gap-8  ">
                    <h6 className="w-80 font-semibold">
                        Trạng thái
                    </h6>
                    <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                checked={isDeleted == "true" ? false : true}
                                onChange={e => setIsDeleted(isDeleted == "true" ? "false" : "true")}
                            />
                        }
                        label="Hoạt động"
                        labelPlacement="end"
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