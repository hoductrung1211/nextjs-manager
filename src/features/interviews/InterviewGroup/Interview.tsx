"use client";
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";

interface IInterviewProps {

}

export default function Interview({

}: IInterviewProps) {
    const personalInfo = [
        {
            icon: "user",
            label: "Tên",
            value: "Trong Nguyen Duc"
        },
        {
            icon: "calendar",
            label: "Ngày sinh",
            value: "26 tháng 9, 2002"
        },
        {
            icon: "venus-mars",
            label: "Giới tính",
            value: "Nam"
        },
        {
            icon: "school",
            label: "Trường",
            value: "Đại học công nghệ thông tin"
        },
        {
            icon: "user-graduate",
            label: "Bằng cấp",
            value: "Trung cấp"
        },
        {
            icon: "chart-simple",
            label: "Kinh nghiệm",
            value: "Ít hơn 1 năm"
        },
        {
            icon: "award",
            label: "Kỹ năng",
            value: "8 kỹ năng"
        },
    ];

    const interviewInfo = [
        {
            icon: "calendar",
            label: "Thời gian phỏng vấn",
            value: new Date().toLocaleString()
        },
        {
            icon: "circle-nodes",
            label: "Trạng thái",
            value: "Chờ phỏng vấn"
        }, 
    ]

    return (
        <section className="p-4 flex gap-8 border rounded-md shadow-sm">
            <div className="p-4 w-full flex flex-col gap-4 border bg-gray-50 rounded-md">
                {personalInfo.map(info => (
                    <div className="flex gap-2">
                        <Icon className="inline-block w-6" name={info.icon} />
                        <p className="w-28 font-semibold">{info.label}</p>
                        {info.value}
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-4 ">
                {interviewInfo.map(info => (
                    <div className="flex gap-2">
                        <Icon className="inline-block w-6" name={info.icon} />
                        <p className="w-44 font-semibold">{info.label}</p>
                        {info.value}
                    </div>
                ))}
            </div>
            <div className="flex-shrink-0 justify-self-end w-fit  flex flex-col gap-8">
                <IconButton
                    name="edit"
                    tooltip="Chỉnh sửa"
                />
                <IconButton
                    name="calendar-check"
                    tooltip="Đánh dấu ứng viên tham dự phỏng vấn"
                />
                <IconButton
                    name="calendar-xmark"
                    tooltip="Đánh dấu ứng viên vắng mặt"
                />
                <IconButton
                    name="marker"
                    tooltip="Đánh giá ứng viên"
                />
            </div>
        </section>
    )
}