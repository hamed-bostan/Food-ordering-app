import axios from "axios";

type OpenStreetMapAddress = {
  state?: string;
  county?: string;
  city?: string;
  suburb?: string;
  neighbourhood?: string;
  road?: string;
  name?: string;
};

type OpenStreetMapResponse = {
  address?: OpenStreetMapAddress;
};

export async function getAddress(lat: number, lng: number): Promise<string> {
  try {
    const { data } = await axios.get<OpenStreetMapResponse>("https://nominatim.openstreetmap.org/reverse", {
      params: {
        format: "json",
        lat,
        lon: lng,
        "accept-language": "fa",
      },
    });

    const address = data.address;
    if (!address) return "آدرس یافت نشد";

    const partsOrder: (keyof OpenStreetMapAddress)[] = [
      "state",
      "county",
      "city",
      "suburb",
      "neighbourhood",
      "road",
      "name",
    ];

    const parts = partsOrder.map((key) => address[key]).filter(Boolean);

    return parts.length > 0 ? parts.join("، ") : "آدرس یافت نشد";
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("خطای Axios در دریافت آدرس:", error.message);
    } else {
      console.error("خطا در دریافت آدرس:", error);
    }
    return "خطا در دریافت آدرس";
  }
}
