import { getFileUrl } from "@/utils/url";
import Image from "next/image";

interface IconProps {
  icon: any;
  size: number;
}

export function Icon({ icon, size }: IconProps) {
  if (!icon) {
    return <>🤠</>;
  }
  return (
    <Image
      src={getFileUrl(icon)}
      alt="Icon"
      width={size}
      height={size}
      className="dark:invert invert-0 opacity-80"
    />
  );
}
