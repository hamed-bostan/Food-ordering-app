import {
  ShoppingCartOutlined,
  CheckBoxOutlined,
  WalletOutlined,
} from "@mui/icons-material";

type TabConfig = {
  label: string;
  icon: typeof ShoppingCartOutlined; // Using the same type for all icons
  tabIndex: number;
};

export const tabsConfig: TabConfig[] = [
  { label: "سبد خرید", icon: ShoppingCartOutlined, tabIndex: 0 },
  { label: "تکمیل اطلاعات", icon: CheckBoxOutlined, tabIndex: 1 },
  { label: "پرداخت", icon: WalletOutlined, tabIndex: 2 },
];
