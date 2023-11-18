'use client';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import Button from '@mui/material/Button';
import { DatePicker } from "@mui/x-date-pickers";
import { IDepartment, getAllDepartments } from "@/apis/masterData";
import { Dayjs } from "dayjs";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";

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
                <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
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
                            <MenuItem value={d.id}>{d.name}</MenuItem>
                        ))} 
                    </Select>
                </FormControl>
                <div className="flex gap-5">
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        maxDate={endDate ?? undefined}
                        format="DD/MM/YYYY"
                        onChange={onChangeStartDate}
                    />
                    <DatePicker
                        label="End Date"
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