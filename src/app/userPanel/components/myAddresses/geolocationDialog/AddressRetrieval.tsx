"use client";

import { useState } from "react";
import axios from "axios";
import LocationPicker from "./LocationPicker";

type Coordinates = {
  lat: number;
  lon: number;
};

export default function AddressRetrieval() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  // Function to get address from coordinates
  const getAddress = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "json",
            lat,
            lon,
          },
        }
      );

      return response.data.display_name || "Address not found"; // Full address and Ensure a valid fallback
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

    const fetchedAddress = await getAddress(lat, lon);
    setAddress(fetchedAddress);
  };

  return <LocationPicker onLocationSelect={handleLocationSelect} />;
}
