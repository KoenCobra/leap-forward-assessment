import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const buttonPositions = [
  { top: 25, left: 30 },
  { top: 60, left: 70 },
  { top: 45, left: 15 },
  { top: 75, left: 40 },
  { top: 20, left: 70 },
];

const UnlockButton = () => {
  return (
    <>
      {buttonPositions.map((position, index) => (
        <button
          key={index}
          className="absolute bg-primary-blue-dark rounded-full grid place-items-center p-5 cursor-pointer"
          style={{
            top: `${position.top}%`,
            left: `${position.left}%`,
          }}
        >
          <FontAwesomeIcon icon={faLock} size="2x" />
        </button>
      ))}
    </>
  );
};

export default UnlockButton;
