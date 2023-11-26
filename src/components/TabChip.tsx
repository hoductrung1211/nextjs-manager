export default function TabChip({
    label,
    children,
}: {
    label?: string,
    children?: React.ReactNode
}) {
    return (
        <span className="flex items-center gap-2">
            {label}
            <span className="grid place-items-center px-2 py-1.5 rounded-lg bg-gray-200">
                {children}
            </span>
        </span>
    )
}