import { cn } from "@/lib/utils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonElevatedProps {
  icon: IconProp;
  text?: string;
  iconClassName?: string;
}

const ButtonElevated = ({ icon, text, iconClassName }: ButtonElevatedProps) => {
  return (
    <>
      <button className="p-3 rounded-md bg-primary-blue-darkest text-center cursor-pointer">
        <FontAwesomeIcon
          icon={icon && icon}
          className={cn(iconClassName, "text-xl")}
          style={{
            strokeWidth: 30,
            stroke: "currentColor",
          }}
        />
        <span>{text}</span>
      </button>
    </>
  );
};

export default ButtonElevated;
