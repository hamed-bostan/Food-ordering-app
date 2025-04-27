import logo from "@/assets/images/icons/Logo.png";
import Image from "next/image";

type LogoProps = {
  size: string;
};

export default function Logo({ size }: LogoProps) {
  return <Image src={logo} className={size} alt="Tarkhineh logo" />;
}
