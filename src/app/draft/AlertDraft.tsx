'use client';
import { Alert, AlertTitle, Box, Button, Slide, SlideProps, Snackbar, Stack } from "@mui/material";
import React from "react";

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
}

export default function DirectionSnackbar() {
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);
  
    const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
        setTransition(() => Transition);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
 
    return (
        <Box sx={{ width: 300 }}> 
            <Button onClick={handleClick(TransitionLeft)}>Left</Button>
            <Snackbar
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                TransitionComponent={transition}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </Box>
    );
}