'use client';
import BreadcrumbHeader from "@/layouts/BreadcrumbHeader";
import MainContentContainer from "@/layouts/MainContentContainer";
import { CustomTabPanel } from "@/components/mui/Tab";
import { Tab, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import RecruitmentBasicInfo from "@/features/recruitments/detail-basic-info/RecruitmentDetail";

export default function Page() {
    const [tabValue, setTabValue] = useState<0 | 1>(0);
    
    function handleChangeTab(event: React.SyntheticEvent, newValue:0 | 1) {
        setTabValue(newValue);
    }
    return (
        <div className="w-full h-screen flex flex-col rounded-xl overflow-hidden">
            <BreadcrumbHeader>
                <Link href="/">
                    Home
                </Link> 
                <Link href="./">
                    Recruitments
                </Link> 
                <Typography color="text.primary">Detail</Typography>
            </BreadcrumbHeader> 

            <MainContentContainer>
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    aria-label="basic tabs example"
                >
                    <Tab label="Basic Information" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab label="Job Posting" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                    <Tab label="Interviews" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
                    <Tab label="Candidates" id="simple-tab-3" aria-controls="simple-tabpanel-3" />
                </Tabs>
                <CustomTabPanel value={tabValue} index={0}>
                    <RecruitmentBasicInfo />
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3}>
                </CustomTabPanel>
            </MainContentContainer>
        </div>
    )
}