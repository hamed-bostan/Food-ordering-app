import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address, NewAddress } from "../../reducers/types";

export type AddressState = {
  addresses: Address[];
};

const initialState: AddressState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    storeAddress(state, action: PayloadAction<NewAddress>) {
      const newId = Date.now(); // You can use a timestamp or uuid
      const newAddress: Address = { id: newId, ...action.payload };
      state.addresses = [...state.addresses, newAddress];
    },
    updateAddress(state, action: PayloadAction<Address>) {
      const { id, title, phoneNumber, name, address } = action.payload;
      // Use map to return a new array without mutating the original state
      state.addresses = state.addresses.map((item) =>
        item.id === id ? { id, title, phoneNumber, name, address } : item
      );
    },
    deleteAddress(state, action: PayloadAction<number>) {
      // Use filter to create a new array without mutating the state
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
    },
  },
});

export const { storeAddress, updateAddress, deleteAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
