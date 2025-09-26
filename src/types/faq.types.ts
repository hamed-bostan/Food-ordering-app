export type ActiveTab = "faq" | "rules" | "privacyPolicy";

export type FaqTabsProps = {
  handleTabClick: (tab: ActiveTab) => void;
  activeTab: ActiveTab;
};

export type FaqTab = {
  id: ActiveTab;
  label: string;
};

export type FaqTabContentProps = {
  activeTab: ActiveTab;
};

export type FaqSection = {
  id: string;
  category: string;
  title: string;
  information: string;
};
