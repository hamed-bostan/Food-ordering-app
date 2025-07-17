import { cardItems } from "../../lib/card-items";
import CardItem from "./CardItem";

export default function CardSection() {
  return (
    <ul className="grid grid-cols-2 gap-x-12 gap-y-4 md:gap-6 md:mr-auto">
      {cardItems.map((item) => (
        <CardItem key={item.id} {...item} />
      ))}
    </ul>
  );
}
