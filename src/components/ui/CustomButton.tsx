import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

type CustomButtonProps = ButtonProps & {
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
  onClick?: () => void;
  sx?: object;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export default function CustomButton({
  children,
  variant = "contained",
  onClick,
  sx = {},
  startIcon = null,
  endIcon = null,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      variant={variant} // 'contained', 'outlined', or 'text'
      onClick={onClick}
      startIcon={startIcon} // Icon at the start
      endIcon={endIcon} // Icon at the end
      sx={{
        backgroundColor: "#417F56",
        "&:hover": {
          backgroundColor: "#326343",
        },
        ...sx, // Allow custom styles to override default styles
      }}
      {...props} // Pass all other props to the button (e.g., 'disabled', 'size', etc.)
    >
      {children}
    </Button>
  );
}
