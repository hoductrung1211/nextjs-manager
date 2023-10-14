'use client';

import { Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
 
export default function Page() {
    const [parents, setParents] = useState({
        0: [
            0
        ]
    });
    const [nextId, setNextId] = useState(1);

    return (
        <div className="h-screen w-screen justify-center items-center flex flex-col gap-3">
            <section className="flex flex-col gap-1">
                {
                    Object.keys(parents).map(parent => (
                        <div className="">
                            {parent}
                        </div>
                    ))
                }
            </section>
            <Button
                variant="outlined"
                onClick={() => {
                setParents([
                    ...parents,
                    nextId
                ]);
                setNextId(nextId + 1);
            }}>
                Add
            </Button>
        </div> 
    )
}

function Loading() {
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => {
        setOpen(true);

        setTimeout(() => {
            setOpen(false)
        }, 2000);
    };

    return (
<div className="flex gap-2">
            <Button onClick={handleOpen}>Show backdrop</Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <Fan />
            </Backdrop>
        </div>
    )
}

function Fan() {
    return (
        <i className="fa-solid fa-fan animate-spin fa-2xl text-[72px] text-white"></i>
    )
}