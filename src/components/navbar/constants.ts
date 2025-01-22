import { CiSearch, CiHeart } from "react-icons/ci";
import {
  IoNotificationsCircleOutline,
  IoShuffle,
  IoBagHandleOutline,
} from "react-icons/io5";
import { ROUTES } from "@/routes/constants";

export const LINKS = [
  {
    path: ROUTES.HOME,
    text: "Home",
    showDownArrow: true,
  },
  {
    path: ROUTES.SHOP,
    text: "Shop",
    showDownArrow: true,
  },
  {
    path: ROUTES.COLLECTION,
    text: "Collection",
    showDownArrow: false,
  },
  {
    path: ROUTES.PAGES,
    text: "Pages",
    showDownArrow: true,
  },
  {
    path: ROUTES.BLOG,
    text: "Blog",
    showDownArrow: true,
  },
  {
    path: ROUTES.CONTACT_US,
    text: "Contact us",
    showDownArrow: false,
  },
];

export const OPTIONS = [
  {
    Icon: CiSearch,
    iconProps: { size: 24 },
  },
  {
    Icon: IoNotificationsCircleOutline,
    iconProps: { size: 24 },
  },
  {
    Icon: IoShuffle,
    iconProps: { size: 24 },
    count: 0,
  },
  {
    Icon: CiHeart,
    iconProps: { size: 24 },
    count: 0,
  },
  {
    Icon: IoBagHandleOutline,
    iconProps: { size: 24 },
    count: 0,
  },
];
