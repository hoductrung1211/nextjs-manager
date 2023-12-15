"use client";
import { CustomTabPanel } from "@/components/mui/Tab";
import { Role, getRole } from "@/configs/authorization";
import FinishedRecruitmentTable from "@/features/recruitments/list-finished/FinishedRecruitmentTable";
import OperatingRecruitmentTable from "@/features/recruitments/list-operating/OperatingRecruitmentTable";
import OthersRecruitmentTable from "@/features/recruitments/list-others/OthersRecruitmentTable";
import WaitingRecruitmentTable from "@/features/recruitments/list-waiting-for-review/WaitingRecruitmentTable";
import MainContentContainer from "@/layouts/MainContentContainer";
import PageContainer from "@/layouts/PageContainer";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

export default function Page() {
	const [tabValue, setTabValue] = useState<number>(0);
	const [isManager, setIsManager] = useState(false);

	function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
		setTabValue(newValue);
	}

	useEffect(() => {
		const role = getRole();

		if (role == Role.HiringManager) {
			setIsManager(true);
		}
	}, []);

	return (
		<PageContainer breadcrumbs={[
			{
				text: "Trang chủ",
				href: ""
			},
			{
				text: "Đợt tuyển dụng"
			}
		]} >
			<MainContentContainer fixedHeight={true}>
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					aria-label="recruitment tabs"
				>
					<Tab label="Đang vận hành" />
					{ isManager && <Tab label="Chờ xét duyệt" /> }
					<Tab label="Hoàn thành" />
					<Tab label="Khác" />
				</Tabs>

				<CustomTabPanel value={tabValue} index={0}>
					<OperatingRecruitmentTable />
				</CustomTabPanel>

				<CustomTabPanel value={tabValue} index={isManager ? 1 : -1}>
					<WaitingRecruitmentTable />
				</CustomTabPanel>

				<CustomTabPanel value={tabValue} index={isManager ? 2 : 1}>
					<FinishedRecruitmentTable />
				</CustomTabPanel>

				<CustomTabPanel value={tabValue} index={isManager ? 3 : 2}>
					<OthersRecruitmentTable />
				</CustomTabPanel>
			</MainContentContainer>
		</PageContainer>
	);
}
