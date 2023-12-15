"use client";
import { useState } from "react";
import InterviewGroupDetail from "./InterviewGroup/InterviewGroup.Detail";
import AsideLayout from "./AsideLayout/AsideLayout";
import CreateInterviewGroup from "./CreateInterviewGroup/CreateInterviewGroup";
import EditInterviewGroup from "./EditInterviewGroup/InterviewGroup.Edit";
import { InterviewPageState } from "./constants";
import IEmployee from "@/models/Employee";
import { createInterviewGroup } from "@/apis/interviews/interviewGroups";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";

interface IInterviewSectionProps {
	recruitmentId: number;
}

export default function InterviewSection({
	recruitmentId,
}: IInterviewSectionProps) {
	const setAlert = useAlert();
	const setLoading = useLoadingAnimation();

	const [pageState, setPageState] = useState<InterviewPageState>(InterviewPageState.Default);
	const [selectedInterviewGroup, setSelectedInterviewGroup] = useState(1);

	async function handleCreateInterviewGroup(groupName: string, interviewers: IEmployee[]) {
		if (!interviewers.length) {
			setAlert({
				message: "Bắt buộc ít nhất phải có 1 người phỏng vấn! Vui lòng thử lại.",
				severity: "warning"
			});
			return;
		}

		setLoading(true);
		try {
			await createInterviewGroup({
				interviewGroupName: groupName,
				recruitmentId,
				interviewers: interviewers.map(i => i.employeeId)
			});
			
			setAlert({
				message: "Tạo nhóm phỏng vấn thành công.",
				severity: "success"
			});

			setPageState(InterviewPageState.Default);
		}
		catch (ex) {
			setAlert({
				message: "Xảy ra lỗi trong quá trình tạo Nhóm phỏng vấn.",
				severity: "error"
			})
		}
		finally {
			setLoading(false);
		}
	}

	return (
		<main className="pt-8 p-4 grid grid-cols-3 items-start gap-5 bg-content">
			<AsideLayout
				onClickAdd={() => setPageState(InterviewPageState.Adding)}
				onClickDetail={(newGroup: number) => {
					setPageState(InterviewPageState.View);
					setSelectedInterviewGroup(newGroup);
				}}
			/>
			{
				pageState == InterviewPageState.Adding ?
					<CreateInterviewGroup
						onCancel={() => setPageState(InterviewPageState.View)}
						onSave={handleCreateInterviewGroup}
					/> :
					pageState == InterviewPageState.View ?
						<InterviewGroupDetail
							group={selectedInterviewGroup}
							onClickEdit={() => setPageState(InterviewPageState.Editing)}
						/> :
						pageState == InterviewPageState.Editing ?
							<EditInterviewGroup
								group={selectedInterviewGroup}
								handleCancel={() => setPageState(InterviewPageState.View)}
								handleSave={() => setPageState(InterviewPageState.View)}
							/> :
							<p></p>
			}
		</main>
	)
}