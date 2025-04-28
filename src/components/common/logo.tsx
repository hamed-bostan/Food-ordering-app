import logo from "@/assets/images/icons/Logo.png";
import Image from "next/image";

export default function Logo() {
  return <Image src={logo} alt="Tarkhineh logo" width={95} className="h-8 " />;
}
