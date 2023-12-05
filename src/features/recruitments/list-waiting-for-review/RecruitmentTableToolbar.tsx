import { Button, Typography } from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

export default function EnhancedTableToolbar({
    numSelected,
    handleApprove,
    handleReject,
}: {
    numSelected: number;
    handleApprove: () => Promise<void>;
    handleReject: () => Promise<void>;
}) {
    return (
        <div className="h-20 px-3 flex justify-between items-center">
            {numSelected > 0 ? (
                <Typography variant="subtitle1" component="div">
                    {numSelected} đợt tuyển dụng được lựa chọn
                </Typography>
            ) : (
                <Typography variant="body1" component="div">
                    Chọn đợt tuyển dụng bất kỳ để xét duyệt
                </Typography>
            )}

            {numSelected > 0 ? (
                <div className="flex gap-3"> 
                    <Button
                        variant="contained"
                        className="bg-green-sea"
                        startIcon={<VerifiedIcon />}
                        onClick={handleApprove}
                    >
                        Thông qua
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        className="bg-alizarin"
                        startIcon={<NotInterestedIcon />}
                        onClick={handleReject}
                    >
                        Từ chối
                    </Button>
                </div>
            ) : null}
        </div>
    )
}