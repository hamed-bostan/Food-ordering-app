"use client";

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
  const { isFranchiseDialogOpen, closeFranchiseDialog, submittedData } =
    useFranchiseDialog();

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
      <DialogContent>
        {submittedData ? (
          <>
            <p>نام و نام خانوادگی: {submittedData.fullName}</p>
            <p>کد ملی: {submittedData.nationalId}</p>
            <p>شماره تماس: {submittedData.phone}</p>
            <p>استان: {submittedData.province}</p>
            <p>شهر: {submittedData.city}</p>
            {submittedData.region && <p>منطقه: {submittedData.region}</p>}
            {submittedData.address && <p>آدرس دقیق: {submittedData.address}</p>}
            {submittedData.propertyArea && (
              <p>مساحت ملک: {submittedData.propertyArea}</p>
            )}
            {submittedData.buildingAge && (
              <p>سن بنا: {submittedData.buildingAge}</p>
            )}
            <p>
              پروانه کسب دارد:
              {submittedData.hasBusinessLicense ? "بله" : "خیر"}
            </p>
            <p>پارکینگ دارد: {submittedData.hasParking ? "بله" : "خیر"}</p>
            <p>آشپزخانه دارد: {submittedData.hasKitchen ? "بله" : "خیر"}</p>
            <p>انباری دارد: {submittedData.hasStorage ? "بله" : "خیر"}</p>
          </>
        ) : (
          <p>اطلاعاتی موجود نیست.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
