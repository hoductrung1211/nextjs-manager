import PageContainer from "@/layouts/PageContainer";

export default function Page() {
    return (
        <PageContainer breadcrumbs={[
            {
              text: "Trang chủ",
              href: ""
            },
            {
              text: "Ứng viên"
            }
        ]}>
            
        </PageContainer>
    )
}