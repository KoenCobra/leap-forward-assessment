import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LevelCardProps {
  title: string;
  description: string;
  image: string;
  borderColor: string;
}

const LevelCard = ({
  title,
  description,
  image,
  borderColor,
}: LevelCardProps) => {
  return (
    <Link
      href={{
        pathname: "/map",
        query: { image: image },
      }}
      className={cn(
        "bg-primary-white rounded-lg p-3 text-center",
        "border-b-12",
        "relative group",
        "hover:cursor-pointer hover:shadow-2xl hover:shadow-blue-medium/50 hover:translate-y[-5px]",
        "transition-shadow duration-300",
        borderColor
      )}
    >
      <h3
        className="
            text-2xl font-bold text-primary-blue-darkest
            mt-12 mb-4 pb-1 w-min mx-auto
            relative
            after:content-[''] after:absolute after:bottom-0
            after:left-1/2 after:-translate-x-1/2 after:w-[160%] after:h-0.5 after:bg-blue-medium
            group-hover:text-blue-medium transition-all duration-300"
      >
        {title}
      </h3>
      <p className="text-balance text-lg text-primary-blue-dark pb-6">
        {description}
      </p>
      <div
        className="
            absolute top-[-30%] right-[50%] transform translate-x-[50%]
            rounded-full bg-primary-white p-3 shadow-xl"
      >
        <Image
          src={image}
          alt="profile"
          width={100}
          height={100}
          priority
          loading="eager"
          className="
              group-hover:scale-105 group-hover:translate-y-[-5px]
              transition-all duration-300"
        />
      </div>
    </Link>
  );
};

export default LevelCard;
