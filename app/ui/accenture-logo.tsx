import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
export default function AccentureLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/acclogo.png.png"
        alt="Accenture logo"
        width={200}
        height={200}
      />
    </div>
  );
}
