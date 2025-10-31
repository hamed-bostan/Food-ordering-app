import Banner from "@/presentation/components/Banner";
import image1 from "@/assets/images/bannerImages/banner-08.webp";
import ContactBranchList from "@/presentation/features/public/contact/ContactBranchList";
import { Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function ContactPage() {
  const whatsappNumber = "989356776075"; // WhatsApp Business number (international format, no + or 00)
  const message = encodeURIComponent("سلام می‌خواستم درباره سفارشم صحبت کنم");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section>
      <Banner imageSrc={image1} text="با ترخینه در تماس باشید." />
      <ContactBranchList />
      <div className="fixed z-50 bottom-6 right-6">
        <Tooltip
          title="چت در واتساپ"
          placement="top"
          arrow
          slotProps={{
            tooltip: { sx: { fontSize: { xs: "0.725rem", md: "0.9rem" } } },
          }}
        >
          <Fab
            color="success"
            aria-label="whatsapp"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: "#25D366",
              color: "#fff",
              "&:hover": { bgcolor: "#1ebe5d" },
              boxShadow:
                "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 30 }} />
          </Fab>
        </Tooltip>
      </div>
    </section>
  );
}
