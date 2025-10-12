import React from "react";

const RightPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-blue-background rounded-2xl p-4 h-screen xl:h-full">
      {children}
    </div>
  );
};

export default RightPanel;
