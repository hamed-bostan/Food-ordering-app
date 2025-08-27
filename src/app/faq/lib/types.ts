export type ActiveTab = "faq" | "rules" | "privacyPolicy";

export type CategoryNavigationProps = {
  handleTabClick: (tab: ActiveTab) => void;
  activeTab: ActiveTab;
};

export type categoryNavigationItemsProps = {
  id: ActiveTab;
  label: string;
};

export type ContentDisplayProps = {
  activeTab: ActiveTab;
};
