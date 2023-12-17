"use client";
import {  useState } from "react";
import InterviewGroup from "./InterviewGroup/InterviewGroup";
import AsideLayout from "./AsideLayout/AsideLayout";
import CreateInterviewGroup from "./CreateInterviewGroup/CreateInterviewGroup";
import EditInterviewGroup from "./EditInterviewGroup/EditInterviewGroup";
import { InterviewPageState } from "./constants";
import IEmployee from "@/models/Employee";
import { createInterviewGroup } from "@/apis/interviews/interviewGroups";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import useRecruitment from "@/hooks/useRecruitment";
import { AxiosError } from "axios";
import useModal from "@/hooks/useModal";
import useConfirm from "@/hooks/useConfirm";

interface IInterviewSectionProps {
}

export default function InterviewSection({
}: IInterviewSectionProps) {
	const {
		recruitmentId,
	} = useRecruitment();
	const confirm = useConfirm();
	const setAlert = useAlert();
	const setLoading = useLoadingAnimation();

	const [refresh, setRefresh] = useState(0);
	const [pageState, setPageState] = useState<InterviewPageState>(InterviewPageState.Default);
	const [interviewGroupId, setInterviewGroupId] = useState<number>();

	async function handleCreateInterviewGroup(groupName: string, interviewers: IEmployee[]) {
		if (!groupName.trim().length) {
			setAlert({
				message: "Bắt buộc nhập tên nhóm phỏng vấn.",
				severity: "warning"
			});
			return;
		}

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

			setRefresh(refresh + 1);
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

	async function handleEditInterviewGroup(groupName: string, interviewers: IEmployee[]) {
		setLoading(true);
		try {
			setPageState(InterviewPageState.View);
		}
		catch (ex) {

		}
		finally {
			setLoading(false);
		}
	}

	async function handleDeleteInterviewGroup(groupId: number) {
		setLoading(true);
		try {
			

			setAlert({
				message: "Xóa nhóm phỏng vấn thành công!",
				severity: "success"
			});
			setPageState(InterviewPageState.Default);
		}
		catch (ex) {
			if (ex instanceof AxiosError) {
				setAlert({
					message: ex.message,
					severity: "error"
				});
			}
		}
		finally {
			setLoading(false);
		}
	}

	return (
		<main className="pt-8 p-4 grid grid-cols-3 items-start gap-5 bg-content">
			<AsideLayout
				key={recruitmentId + refresh}
				onClickAdd={() => setPageState(InterviewPageState.Adding)}
				onClickDetail={(newGroupId: number) => {
					setPageState(InterviewPageState.View);
					setInterviewGroupId(newGroupId);
				}}
			/>
			{pageState == InterviewPageState.Adding ?
				<CreateInterviewGroup
					onCancel={() => setPageState(InterviewPageState.View)}
					onSave={handleCreateInterviewGroup}
				/> :
				pageState == InterviewPageState.View && interviewGroupId ?
					<InterviewGroup
						key={interviewGroupId}
						groupId={interviewGroupId}
						onClickEdit={() => setPageState(InterviewPageState.Editing)}
						onClickDelete={() => confirm("Nhóm phỏng vấn này sẽ bị xóa vĩnh viễn! Bạn chắc chắn muốn xóa?", () => {
							handleDeleteInterviewGroup(interviewGroupId);
						})}
						onClickOff={() => setPageState(InterviewPageState.Default)}
					/> :
					pageState == InterviewPageState.Editing && interviewGroupId ?
						<EditInterviewGroup
							groupId={interviewGroupId}
							onCancel={() => setPageState(InterviewPageState.View)}
							onSave={handleEditInterviewGroup}
						/> :
						<div className="col-span-2 h-full grid place-items-center text-apple-gray-2">
							Chọn 1 nhóm phỏng vấn bất kỳ để hiên thị thông tin chi tiết
						</div>
			}
		</main>
	)
}