import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="flex flex-col">
      <div>Header</div>
      <Outlet />
    </div>
  );
};

export { PageLayout };
