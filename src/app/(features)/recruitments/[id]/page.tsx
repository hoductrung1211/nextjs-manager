'use client';
import BreadcrumbHeader from "@/layouts/BreadcrumbHeader";
import MainContentContainer from "@/layouts/MainContentContainer";
import { CustomTabPanel } from "@/components/mui/Tab";
import { Chip, Tab, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import RecruitmentBasicInfo from "@/features/recruitments/info-detail-basic/RecruitmentDetail";
import TabChip from "@/components/TabChip";

export default function Page({
    params: {id}
}: {
    params: {id: string}
}) {
    const [tabValue, setTabValue] = useState<0 | 1>(0);
    
    function handleChangeTab(event: React.SyntheticEvent, newValue:0 | 1) {
        setTabValue(newValue);
    }
    
    return (
        <div className="w-full h-screen flex flex-col rounded-xl overflow-auto">
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
                    className="sticky top-0 bg-neutral-100 z-10"
                    value={tabValue}
                    onChange={handleChangeTab}
                    aria-label="basic tabs example"
                >
                    <Tab label="Basic Information" id="recruitment-tab-0" aria-controls="recruitment-tabpanel-0" />
                    <Tab label="Job Posting" id="recruitment-tab-1" aria-controls="recruitment-tabpanel-1" />
                    <Tab label="Interviews" id="recruitment-tab-2" aria-controls="recruitment-tabpanel-2" />
                    <Tab
                        id="recruitment-tab-3"
                        aria-controls="recruitment-tabpanel-3"
                        className="h-[48px]"
                        icon={
                            <TabChip label="Candidates">3</TabChip>
                        }
                        iconPosition="end"
                    />
                </Tabs>
                <CustomTabPanel value={tabValue} index={0}>
                    <RecruitmentBasicInfo id={id} />
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