import Image from "next/image";

const LevelCounter = () => {
  return (
    <div className="rounded-sm bg-secondary-yellow h-full w-fit overflow-hidden">
      <Image src="/images/level.svg" alt="level" width={15} height={40} />
    </div>
  );
};

export default LevelCounter;
