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
      <div className="relative z-1">
        <button
          className="relative p-3 rounded-md bg-primary-blue-dark text-center cursor-pointer
          grid place-items-center
        after:content-[''] after:absolute after:inset-0 after:rounded-md  
      after:translate-y-1 after:bg-primary-blue-darkest after:-z-1"
        >
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
      </div>
    </>
  );
};

export default ButtonElevated;
