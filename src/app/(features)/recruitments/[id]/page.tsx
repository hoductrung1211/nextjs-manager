'use client';
import MainContentContainer from "@/layouts/MainContentContainer";
import { CustomTabPanel } from "@/components/mui/Tab";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PageContainer from "@/layouts/PageContainer";
import RecruitmentInfo from "@/features/recruitments/info/RecruitmentInfo";
import JobPostingInfo from "@/features/job-posting/JobPostingInfo";
import Candidates from "@/features/candidates/Candidates";
import InterviewSection from "@/features/interviews/InterviewSection";
import RecruitmentReport from "@/features/reports/RecruitmentReport";
import { RecruitmentProvider } from "@/hooks/useRecruitment";

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
                <RecruitmentProvider recruitmentId={id}>
                    <Tabs
                        className="sticky top-16 bg-neutral-100 z-10 shadow-sm"
                        value={tabValue}
                        onChange={handleChangeTab}
                        aria-label="recruitment tabs"
                    >
                        <Tab label="Thông tin chung" />
                        <Tab label="Bài đăng tuyển" />
                        <Tab label="Ứng viên" />
                        <Tab label="Buổi phỏng vấn" />
                        <Tab label="Báo cáo" />
                    </Tabs>

                    <CustomTabPanel value={tabValue} index={0}>
                        <RecruitmentInfo recruitmentId={id} />
                    </CustomTabPanel>

                    <CustomTabPanel value={tabValue} index={1}>
                        <JobPostingInfo recruitmentId={id} />
                    </CustomTabPanel>

                    <CustomTabPanel value={tabValue} index={2}>
                        <Candidates recruitmentId={id} />
                    </CustomTabPanel>

                    <CustomTabPanel value={tabValue} index={3}>
                        <InterviewSection />
                    </CustomTabPanel>

                    <CustomTabPanel value={tabValue} index={4}>
                        <RecruitmentReport />
                    </CustomTabPanel>
                </RecruitmentProvider>
            </MainContentContainer>
        </PageContainer >
    )
}