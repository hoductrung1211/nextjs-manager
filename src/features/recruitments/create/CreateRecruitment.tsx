'use client';
import { Button, SelectChangeEvent, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react"
import CreateRequisition from "./CreateRequisition";
import { CustomTabPanel } from "@/components/mui/Tab";
import CreateDescription from "./CreateDescription";
import useAlert from "@/hooks/useAlert";
import { Dayjs } from "dayjs";

const steps = ['Recruitment Requisition', 'Recruitment Description'];

export default function CreateRecruitment() {
    const [title, setTitle] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [numberOfPosition, setNumberOfPosition] = useState("");
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [reasonId, setReasonId] = useState("");

    const [activeStep, setActiveStep] = useState(1);
    const setAlert = useAlert();

    const handleNext = () => {
        if (activeStep == steps.length - 1) {
            setAlert({
                message: "Create Recruitment successfully!",
                severity: "success"
            })
            return;
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    return (
        <main className="h-full flex flex-col gap-4 p-4">
            <Stepper
                className="mx-auto h-12 flex gap-8"
                activeStep={activeStep}>
            {steps.map(label => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: { optional?: React.ReactNode } = {};

                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                )
            })}
            </Stepper>
        
            <section className="flex justify-between p-4 gap-10 bg-gray-50">
                <main className="flex-shrink-0 w-2/5">
                    <CustomTabPanel index={0} value={activeStep}>
                        <CreateRequisition
                            title={title}
                            onChangeTitle={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                            
                            departmentId={departmentId}
                            onChangeDepartment={(e: SelectChangeEvent) => setDepartmentId(e.target.value)}

                            numberOfPosition={numberOfPosition}
                            onChangeNumberOfPosition={(event: ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                const numberValue = Number.parseInt(value);

                                if ((numberValue > 0 && numberValue <= 50) || value == "")
                                    setNumberOfPosition(value)
                            }}

                            reasonId={reasonId}
                            onChangeReason={(e: SelectChangeEvent) => setReasonId(e.target.value)}

                            startDate={startDate}
                            onChangeStartDate={(newDate: Dayjs | null) => { setStartDate(newDate) }}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel index={1} value={activeStep}>
                        <CreateDescription
                            
                        />
                    </CustomTabPanel>
                </main>
                
                <aside className="w-2/5 mx-auto flex flex-col justify-between">
                    <CustomTabPanel index={0} value={activeStep}>
                        <Typography variant="h6">Recruitment Requisition</Typography>
                        <Typography sx={{marginTop: "12px"}} variant="body1">A recruitment requisition is a formal request or document initiated by a department within an organization to fill a vacant position. This crucial step in the hiring process serves as the starting point for acquiring new talent, outlining the specific details of the job opening.</Typography>
                    </CustomTabPanel>
                    <CustomTabPanel index={1} value={activeStep}>
                        <Typography variant="h6">Recruitment Description</Typography>
                        <Typography sx={{marginTop: "12px"}} variant="body1">A job description is a formal written document that outlines the duties, responsibilities, qualifications, and other details associated with a specific job or position within an organization. It serves as a comprehensive guide for both job seekers and current employees, providing a clear understanding of the expectations and requirements associated with the role.</Typography>
                    </CustomTabPanel>

                    <div className="ml-auto flex gap-6">
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </aside>
            </section>
        </main>
    )
}