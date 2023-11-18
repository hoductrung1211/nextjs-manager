
interface IIconProps {
    name: string,
    size?: 'lg' | 'xl' | '2xl' | '3xl' | '',
    type?: 'solid' | 'brands'
}

export default function Icon({
    name,
    size = '',
    type = 'solid'
}: IIconProps) {
    return (
        <span className="">
            <i className={`fa-${type} fa-${name} fa-${size}`}></i>
        </span>
    )
}