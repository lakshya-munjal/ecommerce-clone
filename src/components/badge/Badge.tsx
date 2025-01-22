import { IconBaseProps, IconType } from "react-icons";

interface IBadgeProps {
  Icon: IconType;
  count?: number;
  iconProps?: IconBaseProps;
  handleClick?: () => void;
}

export const Badge = (props: IBadgeProps) => {
  const { Icon, count, iconProps, handleClick } = props;

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <Icon {...iconProps} />
      {count !== undefined && (
        <div className="absolute top-[-13px] right-[-10px] border-2 border-white rounded-full w-6 h-6 flex justify-center items-center bg-black text-white text-xs">
          {count}
        </div>
      )}
    </div>
  );
};
