"use client";

import { useContext, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple, LeafletMouseEvent } from "leaflet";
import { MyLocationOutlined, LocationOnOutlined } from "@mui/icons-material";
import { AddressContext } from "@/context/AddressContext";
import {
  fetchAddress,
  handleGetCurrentLocation,
} from "@/components/utils/locationUtils";
import { useAddressDialog } from "@/context/AddressDialogContext";
import CustomButton from "@/components/ui/CustomButton";

// Define types for props
type LocationPickerProps = {
  onLocationSelect: (lat: number, lon: number) => void;
};

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LocationPicker({
  onLocationSelect,
}: LocationPickerProps) {
  const [position, setPosition] = useState<LatLngTuple>([36.2976, 59.5671]); // Default: Mashhad Azadi Square
  const [address, setAddress] = useState<string>("مشهد، میدان آزادی");
  const { setSelectedAddress } = useContext(AddressContext) ?? {};

  const { closeGeolocationDialog, openAddressDialog } = useAddressDialog(); // Access the context values

  const handleGetLocationClick = () => {
    handleGetCurrentLocation(
      setPosition,
      fetchAddress,
      setAddress,
      onLocationSelect
    );
  };

  const handleConfirmLocation = () => {
    if (!address || !setSelectedAddress) {
      return;
    }
    setSelectedAddress(address); // Store in Context api
    openAddressDialog();
    closeGeolocationDialog();
  };

  // Click event handler for setting location
  const LocationMarker = () => {
    useMapEvents({
      click: async (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        await fetchAddress(lat, lng, setAddress);
        onLocationSelect(lat, lng);
      },
    });

    return position ? <Marker position={position} icon={customIcon} /> : null;
  };

  // Update the map center when the position changes, with increased zoom level
  const MapCenter = () => {
    const map = useMap();
    map.setView(position, 14); // Zoom in more by setting a higher zoom level (e.g., 14)
    return null;
  };

  return (
    <div className="w-full h-[19rem] relative">
      {/* Map with default location set to Mashhad Azadi Square */}
      <MapContainer
        center={position}
        zoom={12} // Default zoom level (can be adjusted)
        className="h-full w-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
        <MapCenter /> {/* Update the map center */}
      </MapContainer>

      <div
        className="bg-[#fff] rounded-sm shadow-2xl absolute flex items-center justify-center gap-x-1 top-14 right-5 h-8 w-24 cursor-pointer"
        onClick={handleGetLocationClick}
        style={{ zIndex: 1000 }}
      >
        <MyLocationOutlined sx={{ color: "#417F56", fontSize: 16 }} />
        <span className="text-xs text-[#417F56]">موقعیت من</span>
      </div>
      {address && (
        <div className="flex items-center gap-x-1 bg-[#fff] shadow-md rounded-sm p-2 absolute bottom-16 right-4 left-4">
          <LocationOnOutlined sx={{ color: "#353535", fontSize: 18 }} />
          <p className="text-xs text-[#353535]">{address}</p>
        </div>
      )}
      <CustomButton
        size="small"
        onClick={handleConfirmLocation}
        className="absolute bottom-12 right-1/2 translate-x-1/2"
        sx={{ width: "9rem" }}
      >
        ثبت موقعیت
      </CustomButton>
    </div>
  );
}
