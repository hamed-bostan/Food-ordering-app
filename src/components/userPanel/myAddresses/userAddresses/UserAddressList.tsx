"use client";

import { AddressContext } from "@/context/AddressContext";
import { useAddressDialog } from "@/context/AddressDialogContext";
import { deleteAddress } from "@/redux/reducers/addressSlice";
import { RootState } from "@/redux/store";
import { ModeEditOutlineOutlined, DeleteOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Address } from "@/redux/reducers/types";

export default function UserAddressList() {
  const dispatch = useDispatch();
  const addresses = useSelector((state: RootState) => state.address.addresses); // Get addresses from Redux
  const { openAddressDialog } = useAddressDialog(); // Access the context values

  const addressContext = useContext(AddressContext);
  if (!addressContext) {
    throw new Error("UserAddressList must be used within an AddressProvider");
  }

  const { setEditingAddress } = addressContext;

  const handleEdit = (address: Address) => {
    setEditingAddress(address); // Set the editing address
    openAddressDialog();
  };

  const handleDelete = (id: number) => {
    dispatch(deleteAddress(id)); // Dispatch the delete action
  };

  return (
    <div className="grid gap-y-2 md:grid-cols-2 md:gap-x-2 lg:gap-x-4">
      {addresses.map((item, index) => (
        <div
          key={index}
          className="bg-[#F9F9F9] border border-[#CBCBCB] rounded-sm p-4 text-xs text-[#717171] grid grid-cols-3"
        >
          <p className="text-[#353535] col-span-2 mb-2">{item.address}</p>
          <div className="flex mr-auto gap-x-3">
            <ModeEditOutlineOutlined
              onClick={() => handleEdit(item)}
              sx={{
                color: "#353535",
                cursor: "pointer",
                fontSize: { xs: 18, md: 19 },
              }}
            />
            <DeleteOutlined
              onClick={() => handleDelete(item.id)}
              sx={{
                color: "#353535",
                cursor: "pointer",
                fontSize: { xs: 18, md: 19 },
              }}
            />
          </div>
          <p>{item.title}</p>
          <p>{item.name}</p>
          <p className="mr-auto">{item.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
}
