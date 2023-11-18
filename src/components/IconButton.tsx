import Icon from "./Icon";

export default function IconButton({
    name
}: {
        name: string,
    onClick: () => void,
}) {
    return (
        <button className="rounded-full bg-gray-200">
            <div className="w-10 h-10 grid place-items-center ">
                <Icon name={name} />
            </div>
        </button>
    )
}