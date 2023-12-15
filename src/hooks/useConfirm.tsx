"use client";

import { Button } from "@mui/material";
import useModal from "./useModal";

export default function useConfirm() {
    const {
        setIsOpenModal,
        setModal
    } = useModal();

    function confirm(text: string, onConfirm?: () => void) {
        setIsOpenModal(true);
        setModal({
            children: (
                <div className="w-[480px] p-4 flex flex-col gap-4 bg-white rounded-lg ">
                    <h1 className="text-2xl font-semibold">
                        Xác nhận
                    </h1>
                    {text}
                    <div className="mt-10 flex items-center justify-end gap-6">
                        <Button
                            className="font-semibold"
                            variant="outlined"
                            onClick={() => {
                                setIsOpenModal(false);
                            }}
                        >
                            Trở lại
                        </Button>
                        <Button
                            className="bg-primary font-semibold"
                            variant="contained"
                            onClick={() => {
                                console.log("Xac nhan");
                                setIsOpenModal(false);
                                onConfirm?.();
                            }}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            )
        })
    }

    return confirm;
}