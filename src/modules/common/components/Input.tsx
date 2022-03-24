import { SyntheticEvent } from 'react';

interface Props {
  name?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder: string;
  value: number | string;
  onChange: (e: SyntheticEvent) => void;
  testid?: string;
  type?: string;
}

const Input = ({
  name,
  disabled,
  required,
  placeholder,
  value,
  onChange,
  testid,
  type = 'text',
}: Props): JSX.Element => (
  <input
    id={name}
    name={name}
    type={type}
    disabled={disabled}
    required={required}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="transition text-sm duration-300 ease-in-out w-full px-4 py-2 border border-gray-300 rounded overflow-hidden focus-within:border-blue-400 focus:outline-none"
    data-testid={testid}
  />
);

export default Input;
