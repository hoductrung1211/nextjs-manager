"use client";
import IconButton from "@/components/IconButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Children, useEffect, useState } from "react";
import { InterviewSectionFilter, Order } from "../constants";
import IInterview from "@/models/Interview";
import { renderFilterTab } from "./InterviewSection.helper";
import Interview from "./Interview";
import useModal from "@/hooks/useModal";
import CreateInterview from "./CreateInterview";
import useRecruitment from "@/hooks/useRecruitment";
import { createInterview, getInterviewById, getInterviews } from "@/apis/interviews/interviews";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import useAlert from "@/hooks/useAlert";

interface IInterviewSectionProps {
	interviewGroupId: number;
}

export default function InterviewSection({
	interviewGroupId,
}: IInterviewSectionProps) {
	const setLoading = useLoadingAnimation();
	const setAlert = useAlert();

	const {
		recruitmentId,
	} = useRecruitment();
	const {
		setIsOpenModal,
		setModal,
	} = useModal();
	const [order, setOrder] = useState<Order>(Order.Ascending);

	const [selectedFilter, setSelectedFilter] = useState<InterviewSectionFilter>(InterviewSectionFilter.All);
	const [filterTabs, setFilterTabs] = useState<{
		label: string;
		value: InterviewSectionFilter;
	}[]>([]);

	const [currentInterviews, setCurrentInterviews] = useState<IInterview[]>([]);
	const filteredInterviews = selectedFilter == InterviewSectionFilter.All
		? currentInterviews
		: currentInterviews.filter(interview => interview.interviewStatus.interviewStatusId == selectedFilter);

	useEffect(() => {
		fetchInterviews()
	}, []);

	async function fetchInterviews() {
		setLoading(true);
		try {
			const { data: interviewsRes } = await getInterviews(interviewGroupId);
			setCurrentInterviews(interviewsRes);

			setFilterTabs(renderFilterTab(interviewsRes));
		}
		catch (ex) {
			if (ex instanceof Error) {
				setAlert({
					message: ex.message,
					severity: "error"
				})
			}
		}
		finally {
			setLoading(false);
		}
	}
	
	async function handleAddInterview(formData: {
		candidateId: number;
		dateTime: Date;
	}) {
		const {
			candidateId,
			dateTime,
		} = formData;
		try {
			const {
				data: interviewRes
			} = await createInterview({
				candidateId,
				interviewGroupId,
				dateTime,
			});

			const {
				interviewId
			} = interviewRes;

			const {
				data: newInterview
			} = await getInterviewById(interviewId);

			const newCurrentInterviews = [
				...currentInterviews,
				newInterview,
			];

			setCurrentInterviews(newCurrentInterviews);

			setFilterTabs(renderFilterTab(newCurrentInterviews))
			setIsOpenModal(false)
		}
		catch (ex) {

		}

	}

	
	return (
		<main className="mt-8 flex flex-col gap-2 bg-white">
			<header className="flex justify-between items-center">
				<h3 className=" font-semibold text-lg">
					Buổi phỏng vấn
				</h3>
				<IconButton
					className="rounded-md"
					name="plus"
					tooltip="Thêm mới"
					onClick={() => {
						setModal({
							children:
								<CreateInterview
									recruitmentId={recruitmentId}
									onCancel={() => setIsOpenModal(false)}
									onSave={handleAddInterview}
								/>
						});
						setIsOpenModal(true);
					}}
				/>
			</header>

			<section className="flex justify-between items-center">
				<div className="flex gap-4">
					<FormControl className="w-48">
						<InputLabel>Sắp xếp theo</InputLabel>
						<Select
							className="bg-white"
							size="small"
							value={order}
							label="Sắp xếp theo"
							onChange={e => setOrder(e.target.value == Order.Ascending ? Order.Ascending : Order.Descending)}
						>
							<MenuItem value={Order.Ascending}>Mới nhất</MenuItem>
							<MenuItem value={Order.Descending}>Cũ nhất</MenuItem>
						</Select>
					</FormControl>
				</div>

				<div className="flex gap-4 font-semibold text-apple-gray">
					{filterTabs.map(tab => (
						<div
							key={tab.label}
							className={"py-1 px-4 rounded-md select-none hover:bg-gray-100 " + (tab.value == selectedFilter ? "bg-gray-100" : "")}
							role="button"
							onClick={() => setSelectedFilter(tab.value)}
						>
							{tab.label}
						</div>
					))}
				</div>
			</section>

			<main className="mt-6 p-4 flex flex-col gap-4 rounded-md bg-gray-100">
				{filteredInterviews.length ?
					filteredInterviews.map(interview => (
					<Interview
						key={interview.interviewId}
						interview={interview}
					/>
					)) :
					<div className="h-80 grid place-items-center text-apple-gray-2">
						Danh sách trống
					</div>
			}
			</main>
		</main>
	)
}