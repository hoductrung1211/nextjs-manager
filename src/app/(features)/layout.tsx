import LayoutContainer from "@/layouts/LayoutContainer";
import React from "react";

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <LayoutContainer>
            {children}
        </LayoutContainer>
    )
}