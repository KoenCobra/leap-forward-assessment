import React from "react";

const RightPanel = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-blue-background rounded-2xl p-4">{children}</div>;
};

export default RightPanel;
