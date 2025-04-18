import AddressProperty from "./AddressProperty";
import ApplicantPropertyDetails from "./ApplicantPropertyDetails";
import FacilityProperty from "./FacilityProperty";
import IndividualProfile from "./IndividualProfile";

export default function RequestForm() {
  return (
    <div className="border border-[#CBCBCB] py-8 px-6 rounded-md my-9">
      <span className="text-center mb-11 block">فرم درخواست نمایندگی</span>
      <IndividualProfile />
      <AddressProperty />
      <ApplicantPropertyDetails />
      <FacilityProperty />
    </div>
  );
}
