'use client';
import { CustomTabPanel } from "@/components/mui/Tab";
import CreateDescription from "@/features/recruitments/create/CreateDescription"; 
import CreateRequisition from "@/features/recruitments/create/CreateRequisition";
import useAlert from "@/hooks/useAlert";
import BreadcrumbHeader from "@/layouts/BreadcrumbHeader";
import MainContentContainer from "@/layouts/MainContentContainer";
import {Button, SelectChangeEvent, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

const steps = ['Recruitment Requisition', 'Recruitment Description'];

export default function Page() {
    const [title, setTitle] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [numberOfPosition, setNumberOfPosition] = useState("");
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [reasonId, setReasonId] = useState("");

    const [roleId, setRoleId] = useState("");
    const [qualificationId, setQualificationId] = useState("");
    const [contractTypeId, setContractTypeId] = useState("");
    const [workSiteId, setWorkSiteId] = useState("");
    const [skillIds, setSkillIds] = useState<number[]>([]); 
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");

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
        <div className="w-full h-screen flex flex-col overflow-hidden">
            <BreadcrumbHeader>
                <Link href="./">
                    Home
                </Link> 
                <Link href="./">
                    Recruitments
                </Link> 
                <Typography color="text.primary">Create</Typography>
            </BreadcrumbHeader> 
            <MainContentContainer>
                <Stepper className="mx-auto h-14 flex gap-8" activeStep={activeStep}>
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
            
                <section className="mt-2 flex justify-between p-6 gap-10 bg-gray-50 rounded-lg">
                    <main className="flex-shrink-0 w-1/2">
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
                                roleId={roleId}
                                onChangeRole={e => setRoleId(e.target.value)}

                                qualificationId={qualificationId}
                                onChangeQualification={e => setQualificationId(e.target.value)}

                                contractTypeId={contractTypeId}
                                onChangeContractType={e => setContractTypeId(e.target.value)}

                                workSiteId={workSiteId}
                                onChangeWorkSite={e => setWorkSiteId(e.target.value)}

                                skillIds={skillIds}
                                

                                minSalary={minSalary}
                                onChangeMinSalary={e => {
                                    const value = e.target.value;
                                    const numberValue = Number.parseInt(value);

                                    if (numberValue < 1)
                                        setMinSalary("0")
                                    else if (numberValue > 250_000)
                                        setMinSalary("250000")
                                    else setMinSalary(value); 
                                }}

                                maxSalary={maxSalary}
                                onChangeMaxSalary={e => {
                                    const value = e.target.value;
                                    const numberValue = Number.parseInt(value);

                                    if (numberValue < 1)
                                        setMaxSalary("0")
                                    else if (numberValue > 250_000)
                                        setMaxSalary("250000")
                                    else setMaxSalary(value);
                                }}
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
            </MainContentContainer>
        </div>
    )
}