'use client';
import { managerNavigations } from "@/configs/sidebarNavigation";
import Sidebar, { GenerateNav } from "@/layouts/Sidebar";

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    // call API here
    return (
        <div className="flex">
            <Sidebar> 
                <GenerateNav node={managerNavigations} />
            </Sidebar>
            {children}
        </div>
    )
}