'use client';
import { Navigation } from "@/configs/sidebarNavigation";
import LayoutContainer from "@/layouts/LayoutContainer";

export default function Home() { 
  return (
    <LayoutContainer
      activeNav={Navigation.JobPostings}
      breadcrumbs={[
        {
          text: "Home",
          href:""
        },
        {
          text: "Create",
        }
      ]}
      >
          1
    </LayoutContainer>
  )
}
