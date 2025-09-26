// import HeaderDesktop from "../../shared/header/HeaderDesktop";
import UserAddressList from "./UserAddressList";
import { usePathname } from "next/navigation";
import CustomButton from "@/presentation/components/CustomButton";
import HeaderDesktop from "@/presentation/features/userpanel/shared/header/HeaderDesktop";

export type ContactInfoProps = {
  address: string;
  name: string;
  phone_number: string;
};

type UserAddressProps = {
  contactInfo: ContactInfoProps[];
  onOpenDialog: () => void;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
};

export default function UserAddresses({ contactInfo, onOpenDialog, onDelete, onEdit }: UserAddressProps) {
  const pathname = usePathname();

  return (
    <div
      className={`md:border md:border-[#CBCBCB] md:rounded-lg md:p-5 ${
        pathname === "/checkout" ? "border border-[#CBCBCB] p-4 pb-6 rounded-lg" : ""
      }`}
    >
      <HeaderDesktop label="آدرس ها" style="mb-4" button={true} handleClick={onOpenDialog} />

      <UserAddressList contactInfo={contactInfo} onDelete={onDelete} onEdit={onEdit} />

      <CustomButton
        onClick={onOpenDialog}
        variant="outlined"
        sx={{
          display: pathname === "/checkout" ? "none" : { xs: "flex", md: "none" },
          backgroundColor: "transparent",
          color: "#417F56",
          border: "1px solid #417F56",
          mx: "auto",
          mt: 3,
          "&:hover": {
            backgroundColor: "#326343",
            color: "#fff",
          },
        }}
      >
        افزودن آدرس جدید
      </CustomButton>
    </div>
  );
}
