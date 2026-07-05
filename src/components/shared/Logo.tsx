import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
      <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
        <Image 
          src="/logo.svg" 
          alt="Percepta Logo" 
          fill
          className="object-contain drop-shadow-md"
          sizes="48px"
        />
      </div>
      <span className="font-bold text-xl tracking-tight text-white">Percepta</span>
    </Link>
  );
}
