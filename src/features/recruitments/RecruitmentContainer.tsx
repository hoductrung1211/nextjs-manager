export default function RecruitmentContainer({
    children
}: {
    children?: React.ReactNode
}) {
    return (
        <section className="h-full flex flex-col rounded-b-lg overflow-hidden bg-default">
        {children}
        </section>
    )
}