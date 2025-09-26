import { Dispatch, SetStateAction } from "react";

export type SidebarProps = {
  setActiveTab: Dispatch<SetStateAction<number>>;
  activeTab: number;
};

export type AddressFormProps = {
  onSaveContactInfo: (newAddress: { name: string; phone_number: string; address: string }) => void;
  onClose: () => void;
  defaultValues?: { name: string; phone_number: string; address: string };
};

export type ContactInfo = {
  name: string;
  phone_number: string;
  address: string;
};

export type TabConfig = {
  label: string;
  tabIndex: number;
};

