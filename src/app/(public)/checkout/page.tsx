import Checkout from "@/presentation/features/public/checkout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { AddressService } from "@/application/services/address.service";
import { isOrderDeliveryValid } from "@/domain/order/order.rules";
import { AddressType } from "@/application/schemas/address.schema";

// Server-side fetch function (extracted)
async function fetchUserAddresses(userId: string, token: string) {
  try {
    return await AddressService.fetchAll(userId, token);
  } catch (err) {
    console.error("Server-side address fetch error:", err);
    return []; // Fallback to empty
  }
}

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  // Session checks are already in layout, but adding here for safety (optional)
  if (!session?.user?.id || !session.accessToken) {
    // Redirect or handle unauthorized
    return <div>Unauthorized - Please log in</div>;
  }

  const addresses: AddressType[] = await fetchUserAddresses(session.user.id, session.accessToken);

  let initialSelectedAddress: AddressType | null = null;
  if (addresses.length > 0) {
    const latest = addresses[addresses.length - 1];
    if (isOrderDeliveryValid("courier", null, latest)) {
      initialSelectedAddress = latest;
    }
  }

  return <Checkout addresses={addresses} initialSelectedAddress={initialSelectedAddress} />;
}
