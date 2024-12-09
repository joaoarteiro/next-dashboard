import Image from "next/image";
export default function AccentureLogo() {
  return (
    <Image
      src="/acclogo.png"
      alt="Accenture logo"
      width={160}
      height={160}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}
