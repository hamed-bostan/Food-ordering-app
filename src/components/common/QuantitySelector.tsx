import formatToPersianStyle from "@/lib/formattedPrice";
import {
  DeleteOutlineOutlined,
  AddOutlined,
  RemoveOutlined,
} from "@mui/icons-material";

// Define a type alias for the props
type QuantitySelectorProps = {
  selectedItem: { quantity: number } | null;
  handleIncrease: () => void;
  handleDecrease: () => void;
  handleRemove: () => void;
  styles?: string;
};

export default function QuantitySelector({
  selectedItem,
  handleIncrease,
  handleDecrease,
  handleRemove,
  styles,
}: QuantitySelectorProps) {
  return (
    <div
      className={`bg-[#E5F2E9] rounded-sm h-8 px-1 flex items-center gap-x-1 w-14 self-center ${styles}`}
    >
      <AddOutlined
        onClick={handleIncrease}
        className="cursor-pointer"
        sx={{ color: "#417F56", fontSize: 16 }}
      />
      <span className="text-[#417F56] text-sm">
        {selectedItem ? formatToPersianStyle(selectedItem.quantity) : 1}
      </span>
      {selectedItem && selectedItem.quantity > 1 ? (
        <RemoveOutlined
          onClick={handleDecrease}
          className="cursor-pointer"
          sx={{ color: "#417F56", fontSize: 16 }}
        />
      ) : (
        <DeleteOutlineOutlined
          onClick={handleRemove}
          className="cursor-pointer"
          sx={{ color: "#417F56", fontSize: 16 }}
        />
      )}
    </div>
  );
}
