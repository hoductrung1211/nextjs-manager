"use client";

import InterviewGroupDetail from "./InterviewGroupDetail";
import InterviewGroupList from "./InterviewGroupList";

export default function InterviewSection({

}) {
	// const [selectedInterviewGroup, setSelectedInterviewGroup] = useState();

	// onClickInterviewGroup

	return (
		<main className="pt-8 p-4 grid grid-cols-3 items-start gap-5 bg-content">
			<InterviewGroupList />
			<InterviewGroupDetail />
		</main>
	)
}