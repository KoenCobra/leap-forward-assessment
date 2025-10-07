import { cn } from "@/lib/utils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonElevatedProps {
  icon?: IconProp;
  text?: string;
  addedButtonClasses?: string;
  afterColor?: string;
  iconSize?: number;
  isDisabled?: boolean;
}

const ButtonElevated = ({
  icon,
  text,
  addedButtonClasses = "bg-primary-blue-dark",
  afterColor = "after:bg-primary-blue-darkest",
  iconSize = 24,
  isDisabled = false,
}: ButtonElevatedProps) => {
  return (
    <div className="relative z-1">
      <button
        className={cn(
          "relative p-3 rounded-md text-center cursor-pointer",
          "flex items-center justify-center w-full",
          "after:content-[''] after:absolute after:inset-0 after:rounded-md",
          "after:translate-y-1 after:-z-1",
          afterColor,
          addedButtonClasses
        )}
        disabled={isDisabled}
      >
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={text ? "mr-2" : ""}
            style={{
              strokeWidth: 20,
              stroke: "currentColor",
              height: iconSize,
              width: iconSize,
            }}
          />
        )}
        <span className="font-bold">{text}</span>
      </button>
    </div>
  );
};

export default ButtonElevated;
