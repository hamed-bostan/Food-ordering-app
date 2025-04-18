type AddressSetter = (address: string) => void;
type PositionSetter = (position: [number, number]) => void;
type LocationSelector = (lat: number, lng: number) => void;

// Reverse geocoding function to get Persian address
export const fetchAddress = async (
  lat: number,
  lng: number,
  setAddress: AddressSetter
): Promise<void> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=fa`
    );
    const data: { address?: Record<string, string> } = await response.json();

    if (!data?.address) return setAddress("آدرس یافت نشد");

    const addressParts = [
      data.address.state,
      data.address.county,
      data.address.city,
      data.address.suburb,
      data.address.class,
      data.address.neighbourhood,
      data.address.road,
      data.address.name,
    ].filter(Boolean); // Removes undefined values

    setAddress(addressParts.length ? addressParts.join("، ") : "آدرس یافت نشد");
  } catch (error) {
    console.error("خطا در دریافت آدرس:", error);
    setAddress("خطا در دریافت آدرس");
  }
};

// Function to get the user's current location and update the map center
export const handleGetCurrentLocation = (
  setPosition: PositionSetter,
  fetchAddress: (lat: number, lng: number, setAddress: AddressSetter) => void,
  setAddress: AddressSetter,
  onLocationSelect: LocationSelector
): void => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        fetchAddress(latitude, longitude, setAddress);
        onLocationSelect(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location: ", error);
        setAddress("خطا در دریافت موقعیت");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
