"use client";

interface IInterviewGroupListProps {

}

export default function InterviewGroupList({

}: IInterviewGroupListProps) {
	return (
		<aside className="col-span-1 flex flex-col ">
			<header className=" p-4 py-2 flex items-center justify-between border-b  bg-white border rounded-t-md">
				<h6 className="font-semibold">Tiêu chí đánh giá</h6>
			</header>
			<main className="h-[520px] p-3 flex flex-col gap-4 bg-subdued overflow-auto ">

			</main>
		</aside>
	)
}