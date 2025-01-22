import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

import { Badge } from "../badge/Badge";
import { LINKS, OPTIONS } from "./constants";
import { memo } from "react";

interface NavBarLinkItemProps {
  path: string;
  text: string;
  showDownArrow: boolean;
}

const NavBarLinkItem = (props: NavBarLinkItemProps) => {
  const { path, text, showDownArrow } = props;

  return (
    <div className="flex justify-center items-center cursor-pointer">
      <Link to={path}>{text}</Link>
      {showDownArrow && <FaAngleDown color="black" />}
    </div>
  );
};

const NavBarLinks = () => {
  return (
    <div className="flex gap-6 items-center justify-center">
      {LINKS.map((item) => (
        <NavBarLinkItem key={item.path} {...item} />
      ))}
    </div>
  );
};

const NavBarRightContainer = () => {
  return (
    <div className="flex gap-3 items-center">
      {OPTIONS.map((item, index) => (
        <Badge key={index} {...item} />
      ))}
    </div>
  );
};

export const NavBar = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center py-4">
      <div
        className="text-3xl text-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Flone.
      </div>
      <NavBarLinks />
      <NavBarRightContainer />
    </div>
  );
});
