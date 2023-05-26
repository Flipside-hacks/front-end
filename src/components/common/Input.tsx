import React from "react";

interface Props {
  type: string;
  label: string;
  name?: string;
  placeholder: string;
  value?: string | number;
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input(props: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium text-white" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className="w-full bg-transparent text-white border border-[#363E5B] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:border-none"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        ref={props.ref}
        onChange={props.onChange}
      />
    </div>
  );
}
