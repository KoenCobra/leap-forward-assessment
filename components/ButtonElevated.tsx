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
      <button>
        <FontAwesomeIcon
          icon={icon && icon}
          className={iconClassName}
        ></FontAwesomeIcon>
        <span>{text}</span>
      </button>
    </>
  );
};

export default ButtonElevated;
