"use client";
import { useState } from "react";
import LocationPicker from "./LocationPicker";

type Coordinates = {
  lat: number;
  lon: number;
};

export default function AddressRetrieval() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  // Function to get address from coordinates
  const fetchAddress = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      return data.display_name || "Address not found"; // Full address and Ensure a valid fallback
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address not found";
    }
  };

  // Function to handle location selection
  const handleLocationSelect = async (
    lat: number,
    lon: number
  ): Promise<void> => {
    setLocation({ lat, lon });

    const fetchedAddress = await fetchAddress(lat, lon);
    setAddress(fetchedAddress);
  };

  return <LocationPicker onLocationSelect={handleLocationSelect} />;
}
