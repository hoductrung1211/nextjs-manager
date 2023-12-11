interface IFieldProps {
    label?: string;
    children?: React.ReactNode;
    align?: "center" | "start"
}

export default function Field({
    label,
    children,
    align = "center",
}: IFieldProps) {
    return (
        <div className={`flex items-${align} gap-4`}>
            <h6 className="flex-shrink-0 w-60 font-semibold">{label}</h6>
            {children}
        </div>
    )
}