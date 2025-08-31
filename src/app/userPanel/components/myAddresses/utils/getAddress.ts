import axios from "axios";

export const getAddress = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat,
          lon: lng,
          "accept-language": "fa",
        },
      }
    );

    const { address } = response.data;
    if (!address) return "آدرس یافت نشد";

    const parts = [
      address.state,
      address.county,
      address.city,
      address.suburb,
      address.neighbourhood,
      address.road,
      address.name,
    ].filter((part) => !!part);

    return parts.length > 0 ? parts.join("، ") : "آدرس یافت نشد";
  } catch (error) {
    console.error("خطا در دریافت آدرس:", error);
    return "خطا در دریافت آدرس";
  }
};
