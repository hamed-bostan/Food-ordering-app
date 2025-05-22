import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CustomButton from "../ui/CustomButton";

export default function CheckoutButton() {
  return (
    <div className="w-fit mr-auto">
      <CustomButton
        variant="outlined"
        component={Link}
        href="/checkout"
        startIcon={
          <ShoppingCartOutlinedIcon
            sx={{ width: { xs: 16, md: 20 }, height: { xs: 16, md: 20 } }}
          />
        }
        sx={{
          p: 0,
          color: "#417F56",
          borderColor: "#417F56",
          width: { xs: "6rem", md: "8rem", lg: "11rem" },
          height: { xs: "2rem", md: "2.5rem" },
          backgroundColor: "transparent",
          fontSize: { xs: "0.75rem", md: "0.875rem" },
          "&:hover": {
            color: "#fff",
            backgroundColor: "#417F56",
          },
        }}
      >
        تکمیل خرید
      </CustomButton>
    </div>
  );
}
