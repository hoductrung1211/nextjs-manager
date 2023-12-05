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
        direction == "row" ? "flex justify-between" : "flex flex-col gap-2";
    const contentClass = direction == "row" ? "text-end" : "pl-10";
    return (
        <div className={containerClass}>
            <div className="flex gap-2 text-gray-500 font-bold">
                <Icon className="w-8 grid place-items-center text-lg" name={iconName} />
                <h6>{title}</h6>
            </div>
            <div className={contentClass}>{children}</div>
        </div>
    );
}
