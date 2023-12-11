"use client";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import useAlert from "@/hooks/useAlert";
import { useEffect, useState } from "react";
import { getApplicationByRecruitmentId } from "@/apis/applicationSubmissions/applicationSubmission";
import Application from "./Application";
import IApplicationSubmission, { applicationStatuses } from "@/models/ApplicationSubmission";
import IJobDescription from "@/models/JobDescription";
import { getRecruitmentById } from "@/apis/recruitments/recruitments";

interface IApplicationListProps {
	recruitmentId: number;
	onClickApplication: (application: IApplicationSubmission) => void;
}

export default function ApplicationList({
	recruitmentId,
	onClickApplication
}: IApplicationListProps) {
	const setLoading = useLoadingAnimation();
	const setAlert = useAlert();

	const [applications, setApplications] = useState<IApplicationSubmission[]>([]);
	const [filteredApplications, setFilteredApplications] = useState<IApplicationSubmission[]>([]);
	const [jobDescription, setJobDescription] = useState<IJobDescription>();

	useEffect(() => {
		fetchApplications();
	}, []);

	async function fetchApplications() {
		setLoading(true);
		try {
			const { data: applicationRes } = await getApplicationByRecruitmentId(recruitmentId);
			setApplications(applicationRes);
			setFilteredApplications(applicationRes);

			const { data: recruitmentRes } = await getRecruitmentById(recruitmentId);
			setJobDescription(recruitmentRes.jobDescription);
		}
		catch (ex) {
			setAlert({
				message: "Xảy ra lỗi khi nạp dữ liệu Ứng viên!",
				severity: "error"
			});
		}
		finally {
			setLoading(false);
		}
	}

	function handleFilter(e: SelectChangeEvent) {
		const value = e.target.value;

		if (value == "") {
			setFilteredApplications(applications);
		}
		else {
			const newFilteredOnes = applications.filter(application =>
				application.applicationStatus.applicationStatusId + "" == value);

			setFilteredApplications(newFilteredOnes);
		}
	}

	return (
		<aside className="sticky top-36 col-span-1 flex flex-col ">
			<header className=" p-4 py-2 flex items-center justify-between border-b  bg-white border rounded-t-md">
				<FormControl variant="standard" size="small">
					<InputLabel id="demo-simple-select-label">Lọc ứng viên</InputLabel>
					<Select
						className="w-60"
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						size="small"
						label="Lọc ứng viên"
						onChange={handleFilter}
					>
						<MenuItem value="">
							<em>Tất cả</em>
						</MenuItem>
						{applicationStatuses.map(status => (
							<MenuItem
								key={status.applicationStatusId}
								value={status.applicationStatusId + ""}
							>
								{status.applicationStatusName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<p className="text-apple-gray">Số lượng ứng viên: {filteredApplications.length}/{applications.length}</p>
			</header>

			<main className=" h-[520px] p-3 flex flex-col gap-4 bg-subdued overflow-auto ">
				{jobDescription &&
					(filteredApplications.length ? filteredApplications.map(application => (
						<Application
							key={application.applicationSubmissionId}
							application={application}
							jobDescription={jobDescription}
							onClickApplication={onClickApplication}
						/>)
					) :
						<div className="h-full grid place-items-center text-apple-gray-2">
							Danh sách ứng viên trống
						</div>
					)}
			</main>
		</aside>
	)
}