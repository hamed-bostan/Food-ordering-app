import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFranchiseDialog } from "@/context/FranchiseContext";

export function FranchiseDialog() {
  const { isFranchiseDialogOpen, closeFranchiseDialog } = useFranchiseDialog(); // Access the context values

  return (
    <Dialog
      open={isFranchiseDialogOpen}
      onClose={closeFranchiseDialog}
      sx={{
        "& .MuiDialog-paper": {
          width: "100vw", // Full viewport width
          margin: 0, // Remove default margins
          padding: 0,
          height: "26rem",
          borderRadius: { xs: 0, md: 2 },
        },
      }}
    >
      <div className="bg-[#EDEDED] flex justify-between">
        <DialogTitle
          sx={{
            padding: { xs: 1, md: 2 },
          }}
        >
          <button className="text-sm md:text-base text-[#353535]">
            اطلاعات شما
          </button>
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeFranchiseDialog} sx={{ color: "#717171" }}>
            <CloseIcon />
          </Button>
        </DialogActions>
      </div>
      <DialogContent sx={{ padding: 0 }}>
        <p>نام و نام خانوادگی:</p>
        <p>کد ملی:</p>
        <p>شماره تماس:</p>
        <p>استان:</p>
        <p>شهر:</p>
        <p>منطقه:</p>
        <p>آدرس دقیق:</p>
        <p>نوع مالکیت:</p>
        <p>مساحت ملک:</p>
        <p>سن بنا:</p>
        <p>پروانه کسب دارد</p>

      </DialogContent>
    </Dialog>
  );
}
