import { TabConfig } from "@/types/checkout.types";
import { ShoppingCartOutlined, CheckBoxOutlined, WalletOutlined } from "@mui/icons-material";

export const tabsConfig: TabConfig[] = [
  { label: "سبد خرید", icon: ShoppingCartOutlined, tabIndex: 0 },
  { label: "تکمیل اطلاعات", icon: CheckBoxOutlined, tabIndex: 1 },
  { label: "پرداخت", icon: WalletOutlined, tabIndex: 2 },
];
