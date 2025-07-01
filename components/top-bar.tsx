import Image from "next/image"

export function TopBar() {
  return (
    <div className="h-12 bg-[#142d6a] text-white flex items-center px-6 shadow-sm border-b border-[#1a3570]">
      <div className="flex items-center justify-center py-1">
        <Image
          src="/images/icl-logo.png"
          alt="ICL LogiTrack Logo"
          width={56}
          height={56}
          className="object-contain max-h-10"
          priority
        />
      </div>
    </div>
  )
}
