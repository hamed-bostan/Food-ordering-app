import HeaderDesktop from "../../header/HeaderDesktop";
import { useAddressDialog } from "@/context/AddressDialogContext";
import UserAddressList from "./UserAddressList";
import { usePathname } from "next/navigation";
import CustomButton from "@/components/ui/CustomButton";

export default function UserAddresses() {
  const { openGeolocationDialog } = useAddressDialog(); // Access the context values
  const pathname = usePathname();

  return (
    <div
      className={`md:border md:border-[#CBCBCB] md:rounded-lg md:p-5 ${
        pathname === "/checkout"
          ? "border border-[#CBCBCB] p-4 pb-6 rounded-lg"
          : ""
      }`}
    >
      <HeaderDesktop
        label="آدرس ها"
        style="mb-4"
        button={true}
        openGeolocationDialog={openGeolocationDialog}
      />
      <UserAddressList />
      <CustomButton
        variant="outlined"
        onClick={openGeolocationDialog}
        sx={{
          display:
            pathname === "/checkout" ? "none" : { xs: "flex", md: "none" },
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
