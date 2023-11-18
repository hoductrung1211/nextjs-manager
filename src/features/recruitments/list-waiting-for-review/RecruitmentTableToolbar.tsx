import { Button, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

export default function EnhancedTableToolbar({
    numSelected
}: {
    numSelected: number;
}) {
    return (
        <div className="h-20 px-3 flex justify-between items-center">
            {numSelected > 0 ? (
                <Typography variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography variant="body1" component="div">
                {/* <Typography variant="h6" component="div"> */}
                    Select All or Click on a Recruitment to review
                </Typography>
            )}

            {numSelected > 0 ? (
                <div className="flex gap-3"> 
                    <Button variant="contained" color="success" startIcon={<VerifiedIcon />}>
                        Approve
                    </Button>
                    <Button variant="contained" color="warning" startIcon={<NotInterestedIcon />}>
                        Reject
                    </Button>
                </div>
            ) : null}
        </div>
    )
}