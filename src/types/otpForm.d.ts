import { UseFormRegister, FieldErrors, SubmitHandler } from "react-hook-form";

type FormData = {
  userPhoneNumber: string;
  otp?: string;
};

export type OtpFormProps = {
  message: string;
  loading: boolean;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};
