import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Avatar({

}) {
    const fullName = localStorage.getItem("fullName");

    return (
        <Link
            className="px-3 py-1 flex items-center gap-4 rounded-md text-dark-light hover:bg-slate-200 cursor-pointer "
            href="/profile"                
        >
            <div className="relative w-12 h-12 rounded-full border overflow-hidden bg-scream">
                <Image
                    className="object-contain p-1.5"
                    src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/934px-Logo_of_Twitter.svg.png"}
                    alt=""
                    fill
                />
            </div>
            <p>{fullName}</p>
        </Link>
    )
}