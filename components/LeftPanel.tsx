import React from "react";

export const LeftPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-blue-background rounded-2xl h-full p-4 flex flex-col gap-4">
      {children}
    </div>
  );
};
