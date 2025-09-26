import CustomButton from "@/presentation/components/CustomButton";
import Link from "next/link";

export default function ActionButtons() {
  return (
    <div className="flex justify-center transition-all duration-300 gap-x-4 md:opacity-0 md:group-hover:opacity-100 sm:w-4/5 md:w-4/5 sm:mx-auto">
      <CustomButton
        component={Link}
        href="/branch"
        variant="outlined"
        sx={{
          p: 0,
          width: "100%",
          height: { xs: "1.5rem", md: "2.25rem" },
          color: "#417F56",
          borderColor: "#417F56",
          fontSize: { xs: "0.75rem", md: "0.875rem" },
          backgroundColor: "transparent",
          "&:hover": {
            color: "#fff",
            backgroundColor: "#417F56",
          },
        }}
      >
        صفحه شعبه
      </CustomButton>
      <CustomButton
        sx={{
          p: 0,
          width: "100%",
          height: { xs: "1.5rem", md: "2.25rem" },
          fontSize: { xs: "0.75rem", md: "0.875rem" },
        }}
      >
        دیدن در نقشه
      </CustomButton>
    </div>
  );
}
