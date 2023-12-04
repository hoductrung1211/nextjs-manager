export default function FieldValue({
    title,
    value,
    direction = "column"
}: {
    direction?: "row" | "column";
    title: string;
    value: string;
}) {
    const className = direction == "column" ? "flex flex-col gap-1" : "flex justify-between";
    return (
        <div className={className}>
            <span className="font-semibold">{title}</span>
            {value}
        </div>
    )
}