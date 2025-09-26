import Link from "next/link";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import CustomButton from "@/presentation/components/CustomButton";

export default function ActionButton() {
  return (
    <div className="mx-auto mb-6 text-center w-fit">
      <Link href="/menu">
        <CustomButton
          variant="outlined"
          startIcon={<EventNoteOutlinedIcon sx={{ width: { xs: 16, md: 20 }, height: { xs: 16, md: 20 } }} />}
          sx={{
            color: "#417F56",
            borderColor: "#417F56",
            px: { xs: "0.5rem", md: "0.75rem" },
            height: { xs: "2rem", md: "2.25rem" },
            backgroundColor: "transparent",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#417F56",
            },
          }}
        >
          مشاهده منوی کامل
        </CustomButton>
      </Link>
    </div>
  );
}
