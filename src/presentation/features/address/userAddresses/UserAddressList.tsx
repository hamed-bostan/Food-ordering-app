"use client";

import { AddressType } from "@/application/schemas/address.schema";
import { ModeEditOutlineOutlined, DeleteOutlined } from "@mui/icons-material";
import { useOrderContext } from "@/context/OrderContext";

type UserAddressListProps = {
  addresses: AddressType[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
};

export default function UserAddressList({ addresses, onDelete, onEdit }: UserAddressListProps) {
  const { address: selectedAddress, setAddress } = useOrderContext();

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {addresses.map((address, index) => {
        const isSelected = selectedAddress?.value === address.value;

        return (
          <div
            key={index}
            onClick={() => setAddress(address)}
            className={`bg-[#F9F9F9] rounded-md p-4 text-xs text-[#717171] cursor-pointer transition border-2 
              ${isSelected ? "border-[#417F56]" : "border-[#CBCBCB]"} 
              hover:border-[#417F56]`}
          >
            <div className="flex">
              <p className="text-[#353535]">{address.value}</p>
              <div className="flex mr-auto gap-x-3">
                <ModeEditOutlineOutlined
                  sx={{ color: "#353535", cursor: "pointer", fontSize: { xs: 18, md: 19 } }}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent selecting while editing
                    onEdit(index);
                  }}
                />
                <DeleteOutlined
                  sx={{ color: "#353535", cursor: "pointer", fontSize: { xs: 18, md: 19 } }}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent selecting while deleting
                    onDelete(index);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
