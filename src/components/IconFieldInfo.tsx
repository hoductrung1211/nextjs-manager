import Icon from "./Icon";

export default function IconFieldInfo({
    iconName = "",
    title = "",
    children,
    direction = "column",
}: {
    iconName?: string;
    title?: string;
    children?: React.ReactNode;
    direction?: "row" | "column";
}) {
    const containerClass =
        direction == "row" ? "flex justify-between items-center" : "flex flex-col gap-2";
    const contentClass = direction == "row" ? "text-end" : "pl-14";
    return (
        <div className={containerClass}>
            <div className="flex items-center gap-4 text-gray-700 font-bold">
                <div className="w-10 h-10 grid place-items-center rounded-full bg-gray-200">
                    <Icon className="w-8 grid place-items-center text-lg" name={iconName} />
                </div>
                <h6>{title}</h6>
            </div>
            <div className={contentClass}>{children}</div>
        </div>
    );
}
