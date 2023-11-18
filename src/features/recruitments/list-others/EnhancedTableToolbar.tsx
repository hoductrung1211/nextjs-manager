'use client';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import SearchIcon from '@mui/icons-material/Search';

export default function EnhancedTableToolbar() {
    const [department, setDepartment] = useState('');
    const [value, setValue] = useState<Dayjs | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        setDepartment(event.target.value as string);
    };

    return (
        <div className="h-20 px-3 flex justify-between items-center">
            <div className="w-full flex gap-10 items-center">
                <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                        className="min-w-[120px]"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={department}
                        label="Department"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>IT</MenuItem>
                        <MenuItem value={20}>HR</MenuItem>
                        <MenuItem value={30}>Finance</MenuItem>
                    </Select>
                </FormControl>
                <div className="flex gap-5">
                    <DatePicker
                        label="Start Date"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                            console.log(newValue);
                        }}
                    />
                    <DatePicker
                        label="End Date"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                            console.log(newValue);
                        }}
                    />
                </div>

                <Tooltip className="h-fit" title="Search">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <div className="flex gap-3">
                <Button variant="contained" color="info" startIcon={<AddIcon />}>
                    Create
                </Button>
            </div>
        </div>
    )
}