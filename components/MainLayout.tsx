import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen text-primary-white bg-primary-blue-dark space-y-4 xl:space-y-0 p-2 xl:p-6 xl:grid xl:grid-cols-[32%_1fr] gap-4">
      {children}
    </div>
  );
};

export default MainLayout;
