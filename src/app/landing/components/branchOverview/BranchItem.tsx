import Image from "next/image";
import expandDesktopIcon from "@/assets/images/icons/expand-desktop.svg";
import { FullscreenOutlined, ArrowBackOutlined } from "@mui/icons-material";
import Link from "next/link";
import { Branch } from ".";
import CustomButton from "@/components/ui/CustomButton";

type BranchItemProps = {
  branch: Branch;
};

export default function BranchItem({ branch }: BranchItemProps) {
  return (
    <>
      <DisplayingImage branch={branch} />
      <DisplayingDetails branch={branch} />
    </>
  );
}

function DisplayingImage({ branch }: BranchItemProps) {
  return (
    <figure className="relative h-20 col-span-1 row-span-2 transition-all duration-300 md:h-40 lg:h-52 md:row-span-1 md:group-hover:h-36 lg:group-hover:h-44">
      <Image
        src={branch.image}
        alt={branch.title}
        priority
        placeholder="blur"
        className="object-cover w-full h-full"
      />
      <div className="hidden md:block absolute inset-0 bg-[#181818] opacity-0 group-hover:opacity-65 transition-opacity duration-300 z-20"></div>
      <button
        type="button"
        aria-label={`Displays ${branch.title} image in large size`}
        className="absolute bottom-2 right-2 md:hidden"
      >
        <FullscreenOutlined
          className="absolute bottom-2 right-2"
          sx={{ color: "#fff", fontSize: 18 }}
        />
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

function DisplayingDetails({ branch }: BranchItemProps) {
  return (
    <article className="col-span-1 row-span-2 p-2 text-center md:row-span-1 md:py-4">
      <h3 className="text-sm font-medium text-[#353535] row-span-1 mb-1 md:mb-3 md:text-lg md:font-semibold">
        {branch.title}
      </h3>
      <address className="not-italic text-xs text-[#717171] row-span-1 md:text-sm md:mb-4">
        {branch.address}
      </address>
      <div className="mx-auto transition-opacity duration-300 opacity-0 w-fit group-hover:opacity-100">
        <Link href="/branch" aria-label={`View ${branch.title} branch page`}>
          <CustomButton
            variant="outlined"
            endIcon={
              <ArrowBackOutlined
                sx={{
                  order: 2,
                  width: { xs: 16, md: 20 },
                  height: { xs: 16, md: 20 },
                }}
              />
            }
            sx={{
              backgroundColor: "transparent",
              color: "#315F41",
              border: "1px solid #315F41",
              display: { xs: "none", md: "flex" },
              transition: "opacity 0.3s ease-in-out",
              "&:hover": {
                color: "#FFF",
                backgroundColor: "#326343",
              },
            }}
          >
            صفحه شعبه
          </CustomButton>
        </Link>
      </div>
    </article>
  );
}
