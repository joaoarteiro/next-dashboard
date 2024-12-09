import Image from "next/image";
export default function AccentureLogo() {
  return (
    <Image
      src="/acclogo.png"
      alt="Accenture logo"
      width={200}
      height={200}
      style={{ objectFit: "contain" }}
      layout="intrinsic"
      priority
    />
  );
}
