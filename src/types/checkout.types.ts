import { ShoppingCartOutlined } from "@mui/icons-material";

export type TabConfig = {
  label: string;
  icon: typeof ShoppingCartOutlined; // Using the same type for all icons
  tabIndex: number;
};
