import { useContext } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { AddressContext } from "./context/addressContext";
import { toast } from "react-toastify";
import { getAddress } from "./utils/getAddress";
import Image from "next/image";
import locationIcon from "@/assets/images/icons/location.svg";
import gpsIcon from "@/assets/images/icons/gps.svg";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type AddressSelectorProps = {
  onSubmitLocation: () => void;
};

export default function AddressSelector({ onSubmitLocation }: AddressSelectorProps) {
  const { selectedAddress, setSelectedAddress, selectedLocation, setSelectedLocation } = useContext(AddressContext)!;

  const setLocationAndAddress = async (lat: number, lng: number) => {
    const fetchedAddress = await getAddress(lat, lng);
    setSelectedAddress(fetchedAddress);
    setSelectedLocation([lat, lng]);
  };

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.");
      return;
    }

    try {
      const {
        coords: { latitude, longitude },
      } = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      await setLocationAndAddress(latitude, longitude);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click: (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setLocationAndAddress(lat, lng);
      },
    });
    return <Marker position={selectedLocation} icon={customIcon} />;
  };

  const MapCenter = () => {
    const map = useMap();
    map.setView(selectedLocation, 14);
    return null;
  };

  return (
    <div className="relative w-full">
      <MapContainer center={selectedLocation} zoom={12} className="h-96" style={{ zIndex: 0 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
        <MapCenter />
      </MapContainer>

      <button
        className="absolute flex items-center justify-center gap-x-1 top-10 right-5 h-8 z-[1000] px-2 text-[#417F56] bg-[#FFFFFF] rounded-md"
        onClick={handleGetLocation}
      >
        <Image src={gpsIcon} alt="location icon" />
        <span className="text-sm">موقعیت من</span>
      </button>

      {selectedAddress && (
        <div className="absolute flex items-center p-2 text-sm bg-[#FFFFFF] rounded-md shadow-md select-none gap-x-1 bottom-16 right-4 left-4 text-[#353535] min-h-9">
          <Image src={locationIcon} alt="location icon" />
          <p>{selectedAddress}</p>
        </div>
      )}

      <button
        onClick={onSubmitLocation}
        className="absolute translate-x-1/2 bg-[#417F56] bottom-4 right-1/2 min-w-40 lg:min-w-64 rounded-md text-[#FFFFFF] min-h-8 text-sm shadow-md"
      >
        ثبت موقعیت
      </button>
    </div>
  );
}
