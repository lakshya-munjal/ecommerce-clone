import { memo } from "react";

interface ICheckboxProps {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RawCheckbox = (props: ICheckboxProps) => {
  const { label, id, isChecked, onChange } = props;
  const checkboxId = `${id}-${label}`;

  return (
    <div className="flex gap-2 items-center w-36 h-5">
      <input
        checked={isChecked}
        className="cursor-pointer"
        id={checkboxId}
        onChange={onChange}
        type="checkbox"
      />
      <label className="text-sm cursor-pointer" htmlFor={checkboxId}>
        {label}
      </label>
    </div>
  );
};

export const Checkbox = memo(
  RawCheckbox,
  (prev, next) => prev.isChecked === next.isChecked
);
