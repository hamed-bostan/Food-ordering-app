import { ModeEditOutlineOutlined, DeleteOutlined } from "@mui/icons-material";
import { ContactInfoProps } from ".";

export default function UserAddressList({
  contactInfo,
  onDelete,
  onEdit,
  onAddClick,
}: {
  contactInfo: ContactInfoProps[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  onAddClick: () => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {contactInfo.map((item, index) => (
        <div key={index} className="bg-[#F9F9F9] border border-[#CBCBCB] rounded-md p-4 text-xs text-[#717171]">
          <div className="flex mb-3">
            <p className="text-[#353535]">{item.address}</p>
            <div className="flex mr-auto gap-x-3">
              <ModeEditOutlineOutlined
                sx={{ color: "#353535", cursor: "pointer", fontSize: { xs: 18, md: 19 } }}
                onClick={() => onEdit(index)}
              />
              <DeleteOutlined
                sx={{ color: "#353535", cursor: "pointer", fontSize: { xs: 18, md: 19 } }}
                onClick={() => onDelete(index)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <p>{item.name}</p>
            <p className="mr-auto">{item.phone_number}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
