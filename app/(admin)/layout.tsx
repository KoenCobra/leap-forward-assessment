import { auth } from "@clerk/nextjs/server";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto mt-4 px-8">{children}</div>;
};

export default AdminLayout;
