import { SyntheticEvent, useState } from 'react';
import { IconEye, IconEyeSlash } from 'modules/common/components/Icons';

interface Props {
  placeholder: string;
  value: number | string;
  onChange: (e: SyntheticEvent) => void;
  required?: boolean;
  name?: string;
  testid?: string;
}

const InputPassword = ({
  placeholder,
  value,
  onChange,
  name,
  required,
  testid,
}: Props) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="input-group flex border border-c-lightbrown rounded overflow-hidden focus-within:border-c-darkbrown transition duration-300 ease-in-out">
      <input
        className="flex-1 px-4 py-2 focus:outline-none text-xs"
        placeholder={placeholder}
        type={isShow ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        data-testid={testid}
      />
      <button
        onClick={() => setIsShow(!isShow)}
        type="button"
        className="side px-4 py-2 transition duration-300 ease-in-out text-c-darkbrown"
        data-testid={`button-${testid}`}
      >
        {isShow ? <IconEyeSlash /> : <IconEye />}
      </button>
    </div>
  );
};

export default InputPassword;
