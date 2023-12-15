"use client";

import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import { FormControl, FormLabel, Select } from "@mui/material";
import Interview from "./Interview";
import { useState } from "react";
import CreateInterview from "./Interview.Create";

interface IInterviewGroupDetailProps {
	group: number;
	onClickEdit: () => void;
}

export default function InterviewGroupDetail({
	group,
	onClickEdit
}: IInterviewGroupDetailProps) {
	const interviewers = [
		{
			id: 1,
			name: "Ho Duc Trung",
			employeeRoleType: "HR",
			department: "HR"
		},
		{
			id: 2,
			name: "Bui Thi Ly",
			employeeRoleType: "Front-end Developer",
			department: "IT"
		},
	];

	const interviews = [
		1,
		2,
		3,
		4,
		5
	];

	const [pageState, setPageState] = useState<"adding" | "view">("view") 

	return (
		<main className="p-4 pt-2 col-span-2 flex flex-col gap-6 rounded-t-lg border overflow-hidden shadow-sm bg-white">
			<header className="h-14 flex items-center justify-between text-lg text-primary">
				<h3 className="font-semibold text-lg">Tên nhóm {group}</h3>
				<IconButton
					name="edit"
					onClick={onClickEdit}
					tooltip="Chỉnh sửa"
				/>
			</header>

			<section className="flex flex-col gap-4">
				<h3 className="font-semibold text-lg">Thành viên trong hội đồng</h3>
				<div className="py-6 flex flex-col gap-6 font-semibold bg-gray-50 rounded-md border">
					{
						interviewers.map(interviewer => (
							<div key={interviewer.id} className="px-6 grid grid-cols-10">
								<Icon className="inline-block w-10 text-center" name="user" />
								<p className="col-span-2 font-semibold">
									{interviewer.name}
								</p>
								<p className="col-span-1 text-apple-gray font-semibold">
									#{interviewer.id}
								</p>
								<p className="col-span-3">
									{interviewer.employeeRoleType}
								</p>
								<p className="col-span-3">
									{interviewer.department}
								</p>
							</div>
						))
					}
				</div>
			</section>

			<main className="mt-8 flex flex-col gap-6 bg-white">
				<header className=" flex flex-col gap-2">
					<h3 className="flex justify-between items-center font-semibold text-lg">
						Buổi phỏng vấn
						<IconButton
							className="-mt-2 -mr-2 rounded-md"
							name="plus"
							tooltip="Thêm mới"
							onClick={() => setPageState("adding")}
						/>
					</h3>

					<section className="flex justify-between items-center">
						<div className="flex gap-4">
							<FormControl>
								<FormLabel>Sắp xếp theo</FormLabel>
								<Select
									size="small"
									label="Sắp xếp theo"
								>

								</Select>
							</FormControl>
							<FormControl>
								<FormLabel>Trạng thái</FormLabel>
								<Select
									size="small"
									label="Trạng thái"
								>

								</Select>
							</FormControl>
						</div>

						<div className="flex gap-5 font-semibold text-apple-gray">
							<p>Tổng 5</p>
							<p>Đã phỏng vấn 2</p>
							<p>Vắng 0</p>
						</div>
					</section>
				</header>
				<main className="flex flex-col gap-4">
					{
						pageState == "adding" && 
						<CreateInterview
							onSave={() => setPageState("view")}
							onCancel={() => setPageState("view")}
						/>
					}
					{
						interviews.map(interview => (
							<Interview key={interview} />
						))
					}
				</main>
			</main>
		</main>
	)
}