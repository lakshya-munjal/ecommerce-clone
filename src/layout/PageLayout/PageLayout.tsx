import { Outlet } from "react-router-dom";
import { NavBar } from "@/components";

const PageLayout = () => {
  return (
    <div className="flex flex-col px-4 pt-4 max-w-screen">
      <NavBar />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
};

export { PageLayout };
