'use client';
import { IDepartment, IRequisitionReason, getAllDepartments, getAllRequisitionReasons } from "@/apis/masterData";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,  } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";

interface ICreateRequisition {
    title: string;
    departmentId: string;
    numberOfPosition: string;
    startDate: Dayjs | null;
    reasonId: string;

    onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeDepartment: (e: SelectChangeEvent) => void;
    onChangeReason: (e: SelectChangeEvent) => void;
    onChangeNumberOfPosition: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeStartDate: (newDate: Dayjs | null) => void;
}

export default function CreateRequisition({
    title,
    departmentId,
    numberOfPosition,
    startDate,
    reasonId,

    onChangeTitle,
    onChangeDepartment,
    onChangeReason,
    onChangeNumberOfPosition,
    onChangeStartDate

}: ICreateRequisition) {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [reasons, setReasons] = useState<IRequisitionReason[]>([]);

    const setLoading = useLoadingAnimation();

    useEffect(() => {
        fetchDepartments();
    }, []);

    async function fetchDepartments() {
        try {
            setLoading(true);
            const departmentRes = await getAllDepartments();
            setDepartments(departmentRes.data);

            const reasonRes = await getAllRequisitionReasons();
            setReasons(reasonRes.data);
        }
        catch (ex) {
            console.log(ex);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-8 flex flex-col gap-8 rounded-md shadow-sm border bg-white">
            <TextField
                fullWidth
                id="title"
                label="Recruitment Title"
                variant="outlined"
                value={title}
                onChange={onChangeTitle}
            />
            
            <FormControl fullWidth variant="outlined">
                <InputLabel className="bg-white" id="department-label">Department</InputLabel>
                <Select
                    labelId="department-label"
                    id="department-filled"
                    value={departmentId}
                    onChange={onChangeDepartment}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {departments.map(d => (
                        <MenuItem value={d.departmentId}>
                            {d.departmentName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth variant="outlined"
                id="number" label="Number of position"
                type="number"
                value={numberOfPosition}
                onChange={onChangeNumberOfPosition}
            />

            <DatePicker
                className="w-full"
                label="Start Date"
                value={startDate}
                minDate={dayjs(new Date()).add(3, 'day')}
                onChange={onChangeStartDate}
            />
            <FormControl fullWidth variant="outlined">
                <InputLabel className="bg-white" id="reason-label">Reason</InputLabel>
                <Select
                    labelId="reason-label"
                    id="reason"
                    value={reasonId}
                    onChange={onChangeReason}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {reasons.map(r => (
                        <MenuItem value={r.id}>
                            {r.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}