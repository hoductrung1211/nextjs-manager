"use client";

import IconButton from "@/components/IconButton";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { useState } from "react";
import {ICriteriaData } from "./config";

interface IPopupEditSkillProps {
    criteria: ICriteriaData;
    onSave: (skill: ICriteriaData) => void;
    onCancel: () => void;
}

export default function PopupEditCriteria({
    criteria: {
        criteriaId,
        criteriaName: initCriteriaName,
        isDeleted: initIsDeleted,
    },
    onSave,
    onCancel,
}: IPopupEditSkillProps) {
    const [criteriaName, setCriteriaName] = useState(initCriteriaName);
    const [isDeleted, setIsDeleted] = useState(initIsDeleted);

    function handleSave() {
        onSave({
            criteriaId,
            criteriaName,
            isDeleted,
        })
    }

    return (
        <section className="w-[800px] flex flex-col rounded-lg bg-white">
            <header className="px-8 flex items-center h-14 border-b">
                <h1 className="font-bold text-lg text-primary">
                    Chỉnh sửa tiêu chí đánh giá
                </h1>
            </header>
            <main className="h-full flex flex-col gap-16 px-8 py-16">
                <section className="flex items-center gap-8  ">
                    <h6 className="w-80 font-semibold">
                        Tên tiêu chí đánh giá
                    </h6>
                    <TextField
                        fullWidth
                        value={criteriaName}
                        placeholder="Nhập tên tiêu chí đánh giá"
                        onChange={e => setCriteriaName(e.target.value)}
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