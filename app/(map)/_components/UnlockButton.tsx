"use client";

import { cn } from "@/lib/utils";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface UnlockButtonProps {
  position: { top: number; left: number };
}
const UnlockButton = ({ position }: UnlockButtonProps) => {
  const router = useRouter();
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
        onClick={() => {
          router.push("/quiz");
        }}
      >
        <FontAwesomeIcon icon={faLock} size="2x" />
      </button>
    </>
  );
};

export default UnlockButton;
