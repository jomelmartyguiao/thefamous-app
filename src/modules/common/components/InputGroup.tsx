import { ReactElement, SyntheticEvent } from "react";

interface Props {
    type: string;
    placeholder?: string;
    value: number | string;
    onChange?: (e: SyntheticEvent) => void;
    icon: ReactElement<any, any>;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    onClick?: () => void;
    inputClassName?: string;
    iconContainerClassName?: string;
    className: string;
}

const InputGroup = ({
    type,
    placeholder,
    value,
    onChange,
    icon,
    name,
    required,
    disabled,
    onClick,
    inputClassName,
    iconContainerClassName,
    className
}: Props) => {
    return (
        <div className={`${className} flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-400 transition duration-300 ease-in-out w-full text-gray-800`}>
            <input
                className={`${inputClassName} flex-1 px-4 py-1 focus:outline-none text-xs`}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                name={name}
                disabled={disabled}
            />

            <div 
                className={`${iconContainerClassName} side p-2 border-l border-gray-300 bg-gray-300 transition duration-300 ease-in-out text-white`}
                onClick={onClick}
            >
                {icon}
            </div>
        </div>
    );
};

export default InputGroup;