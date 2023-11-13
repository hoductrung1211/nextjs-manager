'use client';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useState } from "react";

export default function Page() {
    const [value, setValue] = useState<Dayjs | null>(null);
    return (
        <div className="h-screen flex justify-center itemcen">
            <DatePicker
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    console.log(newValue);
                }}
            />

            <DatePicker
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    console.log(newValue);
                }}
            />
        </div>
    )
}
