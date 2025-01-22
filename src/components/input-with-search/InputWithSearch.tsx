import React from "react";
import { CiSearch } from "react-icons/ci";

interface IInputWithSearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputWithSearch = (props: IInputWithSearchProps) => {
  const { value, onChange } = props;

  return (
    <div className="border border-gray-400 rounded w-[200px]">
      <div className="px-2 py-2 flex items-center w-[200px] justify-between">
        <input
          className="w-[140px] outline-none text-sm"
          onChange={onChange}
          placeholder="Search here..."
          value={value}
        />
        <div className="flex gap-1 justify-center items-center">
          <span>|</span>
          <CiSearch size={20} />
        </div>
      </div>
    </div>
  );
};
