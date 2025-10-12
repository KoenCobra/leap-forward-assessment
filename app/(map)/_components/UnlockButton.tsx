"use client";

import { cn } from "@/lib/utils";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UnlockButtonProps {
  position: { top: number; left: number };
}
const UnlockButton = ({ position }: UnlockButtonProps) => {
  return (
    <>
      <button
        className={cn(
          "absolute rounded-full bg-primary-blue-dark",
          "grid place-items-center size-20 cursor-pointer"
        )}
        style={{
          top: `${position.top}%`,
          left: `${position.left}%`,
        }}
      >
        <FontAwesomeIcon icon={faLock} size="2x" />
      </button>
    </>
  );
};

export default UnlockButton;
