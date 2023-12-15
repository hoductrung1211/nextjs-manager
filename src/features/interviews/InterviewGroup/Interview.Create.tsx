import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import ICandidate from "@/models/Candidate";
import { Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

interface ICreateInterviewProps {
    onSave: () => void;
    onCancel: () => void;
}

export default function CreateInterview({
    onSave,
    onCancel,
}: ICreateInterviewProps) {
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


    return (
        <section className="p-4 flex gap-8 border rounded-md shadow-sm">
            <section className=" w-full flex flex-col gap-4">
                <Select>

                </Select>
                <div className="p-4 flex flex-col gap-4 border bg-gray-50 rounded-md">
                    {personalInfo.map(info => (
                        <div className="flex gap-2">
                            <Icon className="inline-block w-6" name={info.icon} />
                            <p className="w-28 font-semibold">{info.label}</p>
                            {info.value}
                        </div>
                    ))}
                </div>
            </section>
            <div className="w-full flex flex-col gap-4 ">
                <DatePicker

                />
            </div>
            <div className="flex-shrink-0 justify-self-end w-fit   flex flex-col gap-8">
                <IconButton
                    className="text-primary rounded-md"
                    name="check"
                    tooltip="Lưu"
                    onClick={onSave}
                />
                <IconButton
                    className="text-error rounded-md"
                    name="xmark"
                    tooltip="Hủy"
                    onClick={onCancel}
                />
            </div>
        </section>
    )
}