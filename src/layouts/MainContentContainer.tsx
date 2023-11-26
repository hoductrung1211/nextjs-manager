export default function MainContentContainer({
    children
}: {
    children?: React.ReactNode
}) {
    return (
        <main className="min-h-full px-4 py-2 flex flex-col bg-neutral-100">
            {children}
        </main>
    )
}