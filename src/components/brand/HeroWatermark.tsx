import Image from "next/image";

export function HeroWatermark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-[3%] pointer-events-none">
      <div className="relative h-96 w-96">
        <Image
          src="/images/logo.png"
          alt=""
          fill
          className="object-contain"
          priority={false}
        />
      </div>
    </div>
  );
}
