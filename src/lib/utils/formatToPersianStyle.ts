export default function formatToPersianStyle(number: number) {
  return new Intl.NumberFormat("fa-IR").format(number);
}
