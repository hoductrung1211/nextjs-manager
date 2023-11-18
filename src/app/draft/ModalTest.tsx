import { Button, Dialog, Modal } from "@mui/material";
import { useState } from "react";

export default function ModalTest() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => setIsOpen(false);

    return (
        <>
        <Button onClick={handleOpen}>Click me</Button>
            <Dialog
                open={isOpen}
                // onClose={handleClose}
            >
                <TestComponent />
            </Dialog>
        </>
    )
}

function TestComponent() {
    return (
        <div>hello</div>
    )
}