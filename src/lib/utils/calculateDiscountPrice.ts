export function calculateDiscountPrice(
  price: number,
  discount?: number | null
): number {
  if (discount == null) return price; // No discount, return original price

  const discountAmount = price - (price * discount) / 100; // Apply discount
  return parseFloat(discountAmount.toFixed(2)); // Ensure two decimal places as number
}
