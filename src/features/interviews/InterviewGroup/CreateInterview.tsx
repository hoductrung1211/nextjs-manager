import { getApplicationByRecruitmentId } from "@/apis/applicationSubmissions/applicationSubmission";
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import { ApplicationStatus } from "@/models/ApplicationSubmission";
import ICandidate from "@/models/Candidate";
import { getVNLocaleDateString } from "@/utils/functions/dateTimeHelper";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface ICreateInterviewProps {
	recruitmentId: number;
	onSave: (data: {
		candidateId: number;
		dateTime: Date;
	}) => void;
	onCancel: () => void;
}

export default function CreateInterview({
	recruitmentId,
	onSave,
	onCancel,
}: ICreateInterviewProps) {
	const setLoading = useLoadingAnimation();
	const setAlert = useAlert();

	console.log("Recruitment ID", recruitmentId);
	const [candidates, setCandidates] = useState<ICandidate[]>([]);

	const [dateTime, setDateTime] = useState(dayjs());
	const [selectedCandidateId, setSelectedCandidateId] = useState("");

	const personalInfo = (() => {
		const candidate = candidates.find(c => c.candidateId + "" == selectedCandidateId);
		if (!candidate)
			return [];

		return [
			{
				icon: "user",
				label: "Tên",
				value: candidate.user.firstName + " " + candidate.user.lastName,
			},
			{
				icon: "calendar",
				label: "Ngày sinh",
				value: getVNLocaleDateString(candidate.user.dateOfBirth),
			},
			{
				icon: "venus-mars",
				label: "Giới tính",
				value: candidate.user.sex ? "Nam" : "Nữ"
			},
			{
				icon: "school",
				label: "Trường",
				value: candidate.school,
			},
			{
				icon: "user-graduate",
				label: "Bằng cấp",
				value: candidate.qualification.qualificationName,
			},
			{
				icon: "chart-simple",
				label: "Kinh nghiệm",
				value: candidate.experience.experienceName,
			},
			{
				icon: "award",
				label: "Kỹ năng",
				value: candidate.skills.length + " kỹ năng"
			},
		];
	})();

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		setLoading(true);
		try {
			const { data: applications } = await getApplicationByRecruitmentId(recruitmentId);
			const qualifiedCandidates = applications
				.filter(app => app.applicationStatus.applicationStatusId == ApplicationStatus.Qualified)
				.map(app => app.candidate);

			setCandidates(qualifiedCandidates);
			console.log(applications);
			console.log(ApplicationStatus.Qualified + ' hehehe');
			console.log(qualifiedCandidates);
		}
		catch (ex) {

		}
		finally {
			setLoading(false);
		}
	}

	function handleSave() {
		try {
			if (!selectedCandidateId)
				throw new Error("Vui lòng chọn ứng viên để tạo buổi phỏng vấn.");
			
			onSave({
				candidateId: Number.parseInt(selectedCandidateId),
				dateTime: dateTime.toDate()
			});
		}
		catch (ex) {
			if (ex instanceof Error) {
				setAlert({
					message: ex.message,
					severity: "warning"
				})
			}
		}
	}

	return (
		<section className="w-[920px] flex flex-col bg-white rounded-lg">
			<header className="h-14 px-6 flex items-center">
				<h2 className="font-semibold text-lg text-primary">
					Thêm buổi phỏng vấn
				</h2>
			</header>
			<main className="mx-2  p-4 flex gap-6 border bg-gray-50">
				<section className=" w-full flex flex-col gap-4">
					<FormControl>
						<InputLabel>Chọn ứng viên</InputLabel>
						<Select
							className="bg-white"
							label="Chọn ứng viên"
							value={selectedCandidateId}
							onChange={e => setSelectedCandidateId(e.target.value)}
						>
							{candidates.map(candidate => (
								<MenuItem value={candidate.candidateId}>
									{candidate.user.firstName + " " + candidate.user.lastName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{personalInfo.length ?
						<div className="p-4 flex flex-col gap-4 border bg-white rounded-md">
							{personalInfo.map(info => (
								<div className="flex gap-2">
									<Icon className="inline-block w-6" name={info.icon} />
									<p className="w-28 font-semibold">{info.label}</p>
									{info.value}
								</div>
							))}
						</div> :
						<div className="h-full grid place-items-center text-apple-gray-2">
							Vui lòng chọn ứng viên
						</div>
					}
				</section>
				<div className="w-full flex flex-col gap-4 ">
					<DatePicker
						label="Ngày phỏng vấn"
						format="DD-MM-YYYY"
						className="bg-white"
						minDate={dayjs()}
						value={dateTime}
					/>
					<TimePicker
						label="Thời gian phỏng vấn"
						className="bg-white"
						value={dateTime}
					/>
				</div>
			</main>
			<footer className="h-14 px-2 flex items-center justify-end gap-6">
				<IconButton
					name="xmark"
					tooltip="Hủy"
					onClick={onCancel}
				/>
				<IconButton
					name="check"
					tooltip="Lưu"
					onClick={handleSave}
				/>
			</footer>
		</section>
	)
}