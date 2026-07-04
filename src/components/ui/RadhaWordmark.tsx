import Image from "next/image";

export function RadhaWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative block h-10 w-[136px] tablet:h-12 tablet:w-[164px] ${className}`}>
      <Image
        src="/assets/radha/brand/radha-devanagari-logo.webp"
        alt="RADHA"
        fill
        sizes="(min-width: 768px) 164px, 136px"
        className="object-contain object-left"
        priority
      />
    </span>
  );
}
