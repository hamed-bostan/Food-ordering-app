import Input from "@/presentation/components/Input";

export default function AdditionalOrderInfo() {
  return (
    <Input
      label="پیام شما"
      labelColor="#717171"
      textColor="#353535"
      borderColor="#CBCBCB"
      multiline
      rows={2}
      sx={{ my: { xs: "12px" }, mt: { md: "20px" } }}
    />
  );
}
