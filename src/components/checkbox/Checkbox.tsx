interface ICheckboxProps {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = (props: ICheckboxProps) => {
  const { label, id, isChecked, onChange } = props;
  const checkboxId = `${id}-${label}`;

  return (
    <div className="flex gap-2 items-center">
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
