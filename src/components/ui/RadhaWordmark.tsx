import Image from "next/image";

export function RadhaWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative block h-9 w-[122px] tablet:h-10 tablet:w-[136px]">
        <Image
          src="/assets/radha/brand/radha-devanagari-logo.webp"
          alt="RADHA"
          fill
          sizes="(min-width: 768px) 136px, 122px"
          className="object-contain object-left"
          priority
        />
      </span>
      <span className="rounded-full border border-black/16 px-2 py-1 text-[10px] font-bold leading-none tracking-normal text-black/72">
        AI
      </span>
    </span>
  );
}
