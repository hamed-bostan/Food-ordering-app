import Image from "next/image";
import expandDesktopIcon from "@/assets/images/icons/expand-desktop.svg";
import { FullscreenOutlined } from "@mui/icons-material";
import { BranchItemProps } from "@/types/landing.types";

export default function DisplayingImage({ branch }: BranchItemProps) {
  return (
    <figure className="relative h-20 col-span-1 row-span-2 transition-all duration-300 md:h-40 lg:h-52 md:row-span-1 md:group-hover:h-36 lg:group-hover:h-44">
      <Image src={branch.image} alt={branch.title} priority placeholder="blur" className="object-cover w-full h-full" />
      <div className="hidden md:block absolute inset-0 bg-[#181818] opacity-0 group-hover:opacity-65 transition-opacity duration-300 z-20"></div>
      <button
        type="button"
        aria-label={`Displays ${branch.title} image in large size`}
        className="absolute bottom-2 right-2 md:hidden"
      >
        <FullscreenOutlined className="absolute bottom-2 right-2" sx={{ color: "#fff", fontSize: 18 }} />
      </button>

      <button
        type="button"
        aria-label={`Displays ${branch.title} image in large size`}
        className="absolute z-30 hidden -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:group-hover:block"
      >
        <Image
          width={40}
          height={40}
          src={expandDesktopIcon}
          alt="expand icon"
          aria-hidden="true"
          className="w-12 h-12"
        />
      </button>
    </figure>
  );
}
