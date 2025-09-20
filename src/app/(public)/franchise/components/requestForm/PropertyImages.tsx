import Image from "next/image";
import uploadIcon from "@/assets/images/icons/upload-image.svg";

export default function PropertyImages() {
  return (
    <div className="w-full">
      <span className="text-[#717171] mb-1 block">تصاویر ملک</span>
      <div className="flex flex-col gap-y-2 border-2 border-[#CBCBCB] rounded-sm items-center w-full min-h-32 justify-center">
        <Image
          src={uploadIcon}
          alt="upload image icon"
          width={50}
          height={50}
          className="w-10 h-10 cursor-pointer"
        />
        <span className="text-[#717171] cursor-pointer">
          تصاویری از ملک را بارگذاری کنید ...
        </span>
      </div>
    </div>
  );
}
