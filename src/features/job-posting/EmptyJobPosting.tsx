"use client";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";

export default function EmptyJobPosting({
    recruitmentId
}: {
    recruitmentId: number;
}) {
    const router = useRouter();
    
    return (
        <div className="h-[600px] grid place-items-center">
            <button
                className="w-96 h-60 flex flex-col gap-5 justify-center items-center text-apple-gray-3 rounded-lg hover:bg-apple-gray-6 hover:border"
                onClick={() => {
                    router.push(`/job-postings/create/${recruitmentId}`)
                }}
            >
                <Icon className="w-20 h-20 grid place-items-center text-3xl" size="2xl" name="file-pen" />
                <p>Đợt tuyển dụng này chưa có Bài đăng tuyển</p>
                <p className="text-lg font-bold">Tạo ngay</p>
            </button>
        </div>
    )
}