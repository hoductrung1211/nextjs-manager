'use client';
import { getAllDepartments } from "@/apis/masterDatas/departments";
import { getAllRequisitionReasons } from "@/apis/masterDatas/jobJustifications";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import IDepartment from "@/models/Department";
import IJobJustification from "@/models/JobJustification";
import { FormControl,  InputLabel, MenuItem, Select, SelectChangeEvent, TextField,  } from "@mui/material";
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

    isTitleError: boolean; setIsTitleError: (newValue: boolean) => void;
    isDepartmentError: boolean; setIsDepartmentError: (newValue: boolean) => void;
    isNumberOfPositionError: boolean; setIsNumberOfPositionError: (newValue: boolean) => void;
    isStartDateError: boolean; setIsStartDateError: (newValue: boolean) => void;
    isReasonError: boolean; setIsReasonError: (newValue: boolean) => void;
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
    onChangeStartDate,

    isTitleError,
    isDepartmentError,
    isNumberOfPositionError,
    isStartDateError,
    isReasonError,
    
    setIsTitleError,
    setIsDepartmentError,
    setIsNumberOfPositionError,
    setIsStartDateError,
    setIsReasonError,
}: ICreateRequisition) {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [reasons, setReasons] = useState<IJobJustification[]>([]);

    const setLoading = useLoadingAnimation();
    useEffect(() => {
        fetchFields();
    }, []);

    async function fetchFields() {
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

    function handleBlurTitle() {
        if (title.trim() == "")
            setIsTitleError(true);
        else setIsTitleError(false);
    }

    function handleBlurDepartment() {
        if (departmentId == "")
            setIsDepartmentError(true);
        else setIsDepartmentError(false);
    }

    function handleBlurNumberOfPosition() {
        if (numberOfPosition == "")
            setIsNumberOfPositionError(true);
        else setIsNumberOfPositionError(false);
    }

    function handleBlurReason() {
        if (reasonId == "")
            setIsReasonError(true);
        else setIsReasonError(false);
    }

    return (
        <div className="relative max-h-[520px] p-8 flex flex-col gap-8 rounded-md shadow-sm border overflow-y-auto overflow-x-hidden bg-white">
            <TextField
                fullWidth
                id="title"
                label="Tiêu đề"
                variant="outlined"
                value={title}
                onChange={onChangeTitle}
                error={isTitleError}
                onBlur={handleBlurTitle}
                suppressHydrationWarning 
            />
            
            <FormControl fullWidth variant="outlined" error={isDepartmentError}>
                <InputLabel className="bg-white" id="department-label">Phòng ban</InputLabel>
                <Select
                    labelId="department-label"
                    id="department-filled"
                    value={departmentId}
                    onChange={onChangeDepartment}
                    onBlur={handleBlurDepartment}
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
                id="number" label="Số lượng cho vị trí tuyển dụng"
                type="number"
                value={numberOfPosition}
                onChange={onChangeNumberOfPosition}
                onBlur={handleBlurNumberOfPosition}
                error={isNumberOfPositionError}
            />

            <DatePicker
                className="w-full"
                label="Ngày dự kiến Onboard"
                value={startDate}
                minDate={dayjs().add(3, 'day')}
                format="DD/MM/YYYY"
                onChange={onChangeStartDate}
            />

            <FormControl fullWidth variant="outlined" error={isReasonError} >
                <InputLabel className="bg-white" id="reason-label">Lý do mở đơn</InputLabel>
                <Select
                    labelId="reason-label"
                    id="reason"
                    value={reasonId}
                    onChange={onChangeReason}
                    onBlur={handleBlurReason}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {reasons.map(r => (
                        <MenuItem value={r.jobJustificationId}>
                            {r.jobJustificationName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">Recruitment Criterias</FormLabel>
                <FormGroup className="px-3">
                    {
                        criterias.map(criteria => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={criteria.criteriaId + ""}
                                        checked={selectedCriterias.includes(criteria.criteriaId + "")}
                                        onChange={onChangeSelectedCriterias}
                                    />
                                }
                                label={criteria.criteriaName}
                            />
                        ))
                    }
                </FormGroup>
                <FormHelperText>There must be at least 3 criterias selected</FormHelperText>
            </FormControl> */}
        </div>
    )
}