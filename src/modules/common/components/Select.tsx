import { SyntheticEvent } from 'react';
import _ from 'lodash';

interface Props {
  name?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder: string;
  value: number | string;
  onChange: (e: SyntheticEvent) => void;
  options: Array<Object>;
  optionKeys?: {
    value: string;
    label: string;
  };
  hasDefaultOption?: boolean;
  defaultOptionLabel?: string;
  testid?: string;
  disabledDefaultOption?: boolean;
  defaultOptionValue?: string | number;
}

const Select = ({
  required = false,
  disabled = false,
  name,
  placeholder,
  value,
  onChange,
  options,
  optionKeys = {
    value: 'value',
    label: 'label',
  },
  hasDefaultOption = true,
  defaultOptionLabel = '- Select -',
  disabledDefaultOption = false,
  defaultOptionValue = '',
  testid,
}: Props) => (
  <select
    name={name}
    disabled={disabled}
    required={required}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="transition text-sm bg-transparent duration-300 ease-in-out w-full px-4 py-2 border border-gray-300 rounded overflow-hidden focus-within:border-blue-400 focus:outline-none"
    data-testid={testid}
  >
    {hasDefaultOption && (
      <option disabled={disabledDefaultOption} value={defaultOptionValue}>
        {defaultOptionLabel}
      </option>
    )}
    {options.map((item) => {
      const value: number | string = _.get(item, optionKeys.value, '');
      const label: string = _.get(item, optionKeys.label, '');
      return (
        <option key={value} value={value}>
          {label}
        </option>
      );
    })}
  </select>
);

export default Select;
