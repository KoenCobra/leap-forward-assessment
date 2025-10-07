import { cn } from "@/lib/utils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonElevatedProps {
  icon: IconProp;
  text?: string;
  addedButtonClasses?: string;
  afterColor?: string;
}

const ButtonElevated = ({
  icon,
  text,
  addedButtonClasses = "bg-primary-blue-dark",
  afterColor = "after:bg-primary-blue-darkest",
}: ButtonElevatedProps) => {
  return (
    <div className="relative z-1">
      <button
        className={cn(
          "relative p-3 rounded-md text-center cursor-pointer",
          "flex items-center justify-center",
          "after:content-[''] after:absolute after:inset-0 after:rounded-md",
          "after:translate-y-1 after:-z-1",
          afterColor,
          addedButtonClasses
        )}
      >
        <FontAwesomeIcon
          icon={icon && icon}
          className={text && "mr-2"}
          style={{
            strokeWidth: 20,
            stroke: "currentColor",
            height: 24,
            width: 24,
          }}
        />
        <span className="font-bold">{text}</span>
      </button>
    </div>
  );
};

export default ButtonElevated;
