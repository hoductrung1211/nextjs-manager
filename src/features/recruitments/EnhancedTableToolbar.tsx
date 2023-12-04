'use client';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import Button from '@mui/material/Button';
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import IDepartment from "@/models/Department";
import { getAllDepartments } from "@/apis/masterDatas/departments";

interface ITableToolbarProps {
    departmentId: string,
    onChangeDepartment: (event: SelectChangeEvent) => void,
    startDate: Dayjs | null,
    onChangeStartDate: (startDate: Dayjs| null) => void,
    endDate: Dayjs | null,
    onChangeEndDate: (startDate: Dayjs | null) => void,
    onClearFilter: () => void,
    onFilter: () => void,

    children?: React.ReactNode,
}

export default function EnhancedTableToolbar({
    departmentId,
    endDate,
    startDate,
    onChangeDepartment,
    onChangeEndDate,
    onChangeStartDate,
    onClearFilter,
    onFilter,
    children
}: ITableToolbarProps) {
    const [departments, setDepartments] = useState<IDepartment[]>([]);


    useEffect(() => {
        fetchDepartments();
    }, []);     

    async function fetchDepartments() {
        try {
            const {data: departmentList} = await getAllDepartments();
            setDepartments(departmentList);
        }
        catch(ex) {
            
        }
    }

    return (
        <div className="h-20 px-3 flex justify-between items-center">
            <div className="w-full flex gap-10 items-center">
                <FormControl variant="standard" size="small">
                    <InputLabel id="demo-simple-select-label">Phòng ban</InputLabel>
                    <Select
                        className="w-60"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={departmentId}
                        label="Department"
                        onChange={onChangeDepartment}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {departments.map(d => (
                            <MenuItem key={d.departmentId} value={d.departmentId}>{d.departmentName}</MenuItem>
                        ))} 
                    </Select>
                </FormControl>
                <div className="flex gap-5">
                    <DatePicker
                        label="Ngày bắt đầu"
                        value={startDate}
                        maxDate={endDate ?? undefined}
                        format="DD/MM/YYYY"
                        onChange={onChangeStartDate}
                    />
                    <DatePicker
                        label="Ngày kết thúc"
                        value={endDate}
                        minDate={startDate ?? undefined}
                        format="DD/MM/YYYY"
                        onChange={onChangeEndDate}
                    />
                </div>
                <Tooltip title="Clear Filter"> 
                    <Button
                        color="inherit"
                        onClick={onClearFilter}
                    >
                        <Icon name="square-minus" size="xl"/>
                    </Button>
                </Tooltip>        
                <Tooltip title="Filter"> 
                    <Button
                        color="inherit"
                        onClick={onFilter}
                    >
                        <Icon name="filter" size="xl"/>
                    </Button>
                </Tooltip>
            </div>

            <div className="flex gap-3">
                {children}
            </div>
        </div>
    )
}