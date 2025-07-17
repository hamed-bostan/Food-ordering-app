import { highlightDetails } from "../lib/highlightDetails";
import HighlightItem from "./HighlightItem";

export default function Highlights() {
  return (
    <div className="grid grid-cols-4 place-items-center py-9">
      {highlightDetails.map((item) => (
        <HighlightItem key={item.id} {...item} />
      ))}
    </div>
  );
}
