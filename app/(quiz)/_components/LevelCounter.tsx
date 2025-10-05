import Image from "next/image";

const LevelCounter = () => {
  return (
    <div className="rounded-sm bg-secondary-yellow h-full w-fit">
      <Image src="/images/level.svg" alt="level" width={12} height={40} />
    </div>
  );
};

export default LevelCounter;
