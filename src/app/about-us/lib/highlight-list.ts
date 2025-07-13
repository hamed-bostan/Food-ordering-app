import {
  Person2Outlined,
  ShowChartOutlined,
  Wifi,
  EventNoteOutlined,
} from "@mui/icons-material";

type HighlightItem = {
  id: number;
  icon: typeof Person2Outlined;
  text: string;
};

export const highlightItems: HighlightItem[] = [
  {
    id: 1,
    icon: Person2Outlined,
    text: "پرسنلی مجرب و حرفه‌ای",
  },
  {
    id: 2,
    icon: ShowChartOutlined,
    text: "کیفیت بالای غذاها",
  },
  {
    id: 3,
    icon: Wifi,
    text: "محیطی دلنشین و آرام",
  },
  {
    id: 4,
    icon: EventNoteOutlined,
    text: "منوی متنوع",
  },
];
