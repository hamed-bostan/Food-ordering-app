import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { isOrderDeliveryValid } from "@/domain/order/order.rules";
import { getServerSession } from "next-auth";
import ClientOrderOverview from ".";
import { AddressService } from "@/application/services/address.service";

// Server-side fetch function (can be extracted)
async function fetchUserAddresses(userId: string, token: string) {
  try {
    return await AddressService.fetchAll(userId, token);
  } catch (err) {
    console.error("Server-side address fetch error:", err);
    return []; // Fallback to empty
  }
}

export default async function OrderOverview() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.accessToken) {
    return <div>Unauthorized - Please log in</div>; // Or redirect
  }

  const addresses = await fetchUserAddresses(session.user.id, session.accessToken);
  let initialSelectedAddress = null;
  if (addresses.length > 0) {
    const latest = addresses[addresses.length - 1];
    if (isOrderDeliveryValid("courier", null, latest)) {
      initialSelectedAddress = latest;
    }
  }

  return <ClientOrderOverview addresses={addresses} initialSelectedAddress={initialSelectedAddress} />;
}
