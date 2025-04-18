import { TextField, TextFieldProps } from "@mui/material";
type InputProps = TextFieldProps & {
  label: string;
  labelColor?: string;
  textColor?: string;
  borderColor?: string;
};

export default function Input({
  label,
  labelColor = "#717171",
  textColor = "#353535",
  borderColor = "#CBCBCB",
  sx = {},
  ...props
}: InputProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      size="small"
      sx={{
        "& .MuiInputLabel-root": {
          color: labelColor, // Dynamic Label color
          fontSize: { xs: "12px", lg: "14px" }, // Label font size changes at lg
        },
        "& .MuiInputLabel-root.Mui-focused": { color: labelColor }, // Label color when focused
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor }, // Default border color
          "&:hover fieldset": { borderColor }, // Hover effect
          "&.Mui-focused fieldset": { borderColor }, // Focus effect
        },
        "& .MuiInputBase-input": {
          color: textColor, // Dynamic Input text color
          fontSize: { xs: "12px", lg: "14px" }, // Input text font size changes at lg
        },
        ...sx, // Allow custom styles to override default styles
      }}
      {...props}
    />
  );
}
