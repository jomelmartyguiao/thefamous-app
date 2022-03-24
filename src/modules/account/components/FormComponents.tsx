import { ReactNode } from "react";

interface Props {
  type?: string,
  name: string,
  label: string,
  value?: string,
  width?: string,
  defaultValue?: string,
  handleChange: any,
  icon?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
}


export const Input = ({ type, name, label, value, icon, disabled, width, handleChange }:Props) => {
  return(
    <div className={`border focus-within:border-gray-500 focus-within:text-gray-500 transition-all duration-500 
      relative rounded p-1 ${width}`}>
      <div className="-mt-3 absolute tracking-wider px-1 uppercase text-xxs">
        <p>
          <label htmlFor={name} className="bg-white text-gray-900 px-1 flex flex-row">
            {label} <span className="ml-1 text-xs">{icon}</span>
          </label>
        </p>
      </div>
      <p>
        <input 
          id={name} 
          autoComplete="false" 
          disabled={disabled}
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className="py-1 px-1 text-gray-900 outline-none block h-full w-full" />
      </p>
    </div>
  );
}

export const Select = ({ name, label, value, icon, handleChange, children, defaultValue }:Props) => {
  return(
    <div className="border focus-within:border-gray-500 focus-within:text-gray-500 transition-all duration-500 
      relative rounded p-1">
      <div className="-mt-3 absolute tracking-wider px-1 uppercase text-xxs">
        <p>
          <label htmlFor={name} className="bg-white text-gray-900 px-1">{label} {icon}</label>
        </p>
      </div>
      <p>
        <select 
          id={name} 
          autoComplete="false"
          value={value}
          defaultValue={defaultValue}
          name={name}
          onChange={handleChange}
          className="py-1 px-1 text-gray-900 outline-none block h-full w-full">
            {children}
        </select>
      </p>
    </div>
  );
}

export const TextArea = ({ name, label, value, handleChange }:Props) => {
  return(
    <div className="border focus-within:border-gray-500 focus-within:text-gray-500 transition-all duration-500 
      relative rounded p-1">
      <div className="-mt-3 absolute tracking-wider px-1 uppercase text-xxs">
        <p>
          <label htmlFor={name} className="bg-white text-gray-900 px-1">{label}</label>
        </p>
      </div>
      <p>
        <textarea 
          id={name} 
          autoComplete="false"
          value={value}
          name={name}
          onChange={handleChange}
          className="py-1 px-1 text-gray-900 outline-none block h-full w-full" />
      </p>
    </div>
  )
}