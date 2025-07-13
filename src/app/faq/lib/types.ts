export type ActiveTab = "faq" | "rules" | "privacyPolicy";

export type CategoryNavigationProps = {
  handleTabClick: (tab: ActiveTab) => void;
  activeTab: ActiveTab;
};

export type Tab = {
  id: ActiveTab;
  label: string;
};

export type ContentDisplayProps = {
  activeTab: ActiveTab;
};
