import { Divider } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { usePathname } from "next/navigation";
import CustomButton from "@/components/ui/CustomButton";

type HeaderDesktopProps = {
  label: string;
  style?: string; // Optional style prop
  button?: boolean; // Optional button prop
  openGeolocationDialog?: () => void; // Optional function for opening geolocation dialog
};

export default function HeaderDesktop({
  label,
  style,
  button,
  openGeolocationDialog,
}: HeaderDesktopProps) {
  const pathname = usePathname();

  return (
    <div
      className={`${pathname === "/userPanel" && "hidden"} md:block ${style}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="block text-[#353535]">{label}</span>
        {button && (
          <CustomButton
            variant="outlined"
            onClick={openGeolocationDialog}
            startIcon={
              <AddCircleOutlineOutlinedIcon
                sx={{ width: "18px", height: "18px" }}
              />
            }
            sx={{
              display: {
                xs: pathname === "/checkout" ? "flex" : "none",
                md: "flex",
              },
              backgroundColor: "transparent",
              color: "#417F56",
              fontSize: "0.75rem",
              border: "none",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#326343",
              },
            }}
          >
            افزودن آدرس جدید
          </CustomButton>
        )}
      </div>
      <Divider />
    </div>
  );
}
