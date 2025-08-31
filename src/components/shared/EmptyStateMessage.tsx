import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../ui/CustomButton";
import svgIcon from "@/assets/images/icons/empty-icon.svg";

type EmptyStateMessageProps = {
  text: string;
  button?: boolean;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
};

export default function EmptyStateMessage({ text, button, buttonText, href, onClick }: EmptyStateMessageProps) {
  return (
    <div className="relative border border-[#CBCBCB] rounded-lg min-h-96">
      <Image
        src={svgIcon}
        alt="empty icon"
        width={100}
        height={100}
        className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:w-64 md:h-64"
      />
      <p className="text-nowrap text-[#717171] text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:text-sm lg:text-base">
        {text}
      </p>
      {button &&
        (href ? (
          <Link href={href} passHref>
            <CustomButton
              variant="outlined"
              sx={{
                color: "#417F56",
                borderColor: "#417F56",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, 28px)",
                width: { xs: "9rem", md: "10rem", lg: "12rem" },
                backgroundColor: "transparent",
                "&:hover": {
                  color: "#FFFFFF",
                  backgroundColor: "#326343",
                },
              }}
            >
              {buttonText}
            </CustomButton>
          </Link>
        ) : (
          <Button
            onClick={onClick}
            variant="outlined"
            sx={{
              color: "#417F56",
              borderColor: "#417F56",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 28px)",
              width: { xs: "9rem", md: "10rem", lg: "12rem" },
              backgroundColor: "transparent",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "#326343",
              },
            }}
          >
            {buttonText}
          </Button>
        ))}
    </div>
  );
}
