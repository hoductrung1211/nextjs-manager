import Image from "next/image";
import Link from "next/link";
import logoImgSrc from "./job-interview.png";

export default function Logo({
    href
}: {
    href?: string,
}) {
    return (
        <Link className="flex items-center gap-2 font-bold" href={href ?? ""}>
            <section className="relative w-9 h-9">
                <Image
                    className="object-contain"
                    src={logoImgSrc}
                    alt=""
                    fill
                />
            </section>
            <section className="flex flex-col">
                <p>
                    <span className="text-primary">TeS Careers</span>
                </p>
                <p className="text-xs font-bold">Recruitment Management</p>
            </section>
        </Link>
    )
}