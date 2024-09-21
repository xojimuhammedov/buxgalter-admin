import HomeSvg from "@/svg/HomeSvg";
import PeopleLogo from "@/svg/PeopleLogo";
import SettingSvg from "@/svg/SettingSvg";
import ProductIcon from "@/svg/Products";
import TeamIcon from "@/svg/TeamIcon";
import BlogIcon from "@/svg/BlogIcon";
import UserIcon from "@/svg/UserIcon";
import RefundIcon from "@/svg/RefundIcon";
import PdfIcon from "@/svg/PdfIcon";
import OrderIcon from "@/svg/OrderSvg";

interface MenuItem {
  id: number;
  text: string;
  icon: () => JSX.Element;
  link?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  text: string;
  link: string;
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    text: "Asosiy",
    icon: HomeSvg,
    link: "/",
  },

  {
    id: 2,
    text: "Foydalanuvchilar",
    icon: PeopleLogo,
    submenu: [
      {
        text: "Foydalanuvchilar",
        link: "/news",
      },
      {
        text: "Foydalanuvchi yaratish",
        link: "/create-news",
      },
    ],
  },
  {
    id: 7,
    text: "Kurslar",
    icon: BlogIcon,
    submenu: [
      {
        text: "Kurslar",
        link: "/categories",
      },
      {
        text: "Kurs Yaratish",
        link: "/create-categories",
      },
    ],
  },

  {
    id: 8,
    text: "Darslar",
    icon: BlogIcon,
    submenu: [
      {
        text: "Darslar",
        link: "/products",
      },
      {
        text: "Dars yaratish",
        link: "/create-products",
      },
    ],
  },
];
