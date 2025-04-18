export type NavigationItem = {
  id: number;
  text: string;
  path: string;
  image?: string;
  icon?: string;
};

export type VoidHandler = () => void;

export type MobileDrawerProps = {
  navigationItems: ReadonlyArray<NavigationItem>; // with "ReadonlyArray" the array is immutable
  // Second solution
  // navigationItems: NavigationItem[];
  isDrawerOpen: boolean;
  handleClose: VoidHandler;
};

export type NavigationListProps = {
  item: NavigationItem;
  isLast: boolean;
  handleClose: VoidHandler;
};
