import { cn } from "@/lib/utils";
import React from "react";

const ContentElevated = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-1">
      <div
        className={cn(
          "relative bg-blue-medium grid place-items-center rounded-sm",
          "after:content-[''] after:absolute after:inset-0 after:rounded-md",
          "after:translate-y-1 after:bg-primary-blue-dark after:-z-1"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ContentElevated;
