import {   Typography } from "@mui/material"; 
import IconButton from "@/components/IconButton";

export default function EnhancedTableToolbar({
    numSelected,
    onClickAddButton,
}: {
    numSelected: number;
    onClickAddButton: () => void;
}) {
    return (
        <div className="h-20 px-3 flex justify-between items-center">
            {numSelected > 0 ? (
                <Typography variant="subtitle1" component="div">
                    {numSelected} đợt tuyển dụng được lựa chọn
                </Typography>
            ) : (
                <Typography variant="body1" component="div">
                    Chọn 1 kỹ năng bất kỳ
                </Typography>
            )}

            <div className="flex gap-3">
                {numSelected > 0 ?
                    <>
                        <IconButton
                            name="circle-dot"
                            tooltip="Bật hoạt động"
                        />
                        <IconButton
                            name="circle-xmark"
                            tooltip="Tắt hoạt động"
                        />
                    </> :
                    <IconButton
                        name="plus"
                        tooltip="Thêm mới"
                        onClick={onClickAddButton}
                    />
                }
            </div>
        </div>
    )
}