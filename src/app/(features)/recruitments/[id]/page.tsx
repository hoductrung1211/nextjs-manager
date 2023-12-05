'use client';
import MainContentContainer from "@/layouts/MainContentContainer";
import { CustomTabPanel } from "@/components/mui/Tab";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TabChip from "@/components/TabChip";
import PageContainer from "@/layouts/PageContainer";
import RecruitmentInfo from "@/features/recruitments/info/RecruitmentInfo";
import JobPostingInfo from "@/features/recruitments/job-posting/JobPostingInfo";

export default function Page({
    params: { id }
}: {
    params: { id: number }
}) {
    const [tabValue, setTabValue] = useState<0 | 1>(0);

    function handleChangeTab(event: React.SyntheticEvent, newValue: 0 | 1) {
        setTabValue(newValue);
    }

    return (
        <PageContainer breadcrumbs={[
            {
                text: "Trang chủ",
                href: ""
            },
            {
                text: "Đợt tuyển dụng",
                href: "/recruitments"
            },
            {
                text: "Thông tin chi tiết"
            }
        ]}>
            <MainContentContainer>
                <Tabs
                    className="sticky top-16 bg-neutral-100 z-10 shadow-sm"
                    value={tabValue}
                    onChange={handleChangeTab}
                    aria-label="basic tabs example"
                >
                    <Tab label="Thông tin chung" id="recruitment-tab-0" aria-controls="recruitment-tabpanel-0" />
                    <Tab label="Bài đăng tuyển" id="recruitment-tab-1" aria-controls="recruitment-tabpanel-1" />
                    <Tab label="Buổi phỏng vấn" id="recruitment-tab-2" aria-controls="recruitment-tabpanel-2" />
                    <Tab
                        id="recruitment-tab-3"
                        aria-controls="recruitment-tabpanel-3"
                        className="h-[48px]"
                        icon={
                            <TabChip label="Ứng viên">3</TabChip>
                        }
                        iconPosition="end"
                    />
                </Tabs>
                
                <CustomTabPanel value={tabValue} index={0}>
                    <RecruitmentInfo recruitmentId={id} />
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                    <JobPostingInfo recruitmentId={id} />
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>

                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3}>

                </CustomTabPanel>
            </MainContentContainer>
        </PageContainer>
    )
}