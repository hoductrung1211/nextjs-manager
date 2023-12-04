
interface IIconProps {
    name: string,
    size?: 'lg' | 'xl' | '2xl' | '3xl' | '',
    type?: 'solid' | 'brands';
    className?: string;
}

export default function Icon({
    name,
    size = '',
    type = 'solid',
    className
}: IIconProps) {
    return (
        <span className={className}>
            <i className={`fa-${type} fa-${name} fa-${size}`}></i>
        </span>
    )
}