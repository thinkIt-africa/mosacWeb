import Image from "next/image";
import { withBase } from "@/lib/paths";
import type { MediaAsset } from "@/types/content";

/** Responsive photo that fills its (relatively positioned) parent. */
export function Photo({
  asset,
  sizes,
  priority = false,
  className = "",
}: {
  asset: MediaAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={withBase(asset.src)}
      alt={asset.alt}
      fill
      sizes={sizes}
      preload={priority}
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
      className={`object-cover ${className}`}
      style={{ objectPosition: asset.focal ?? "50% 50%" }}
    />
  );
}

export function PhotoCredit({ asset, className = "" }: { asset: MediaAsset; className?: string }) {
  return (
    <p className={`text-xs text-steel-300 ${className}`}>
      {asset.event ? `${asset.event}. ` : ""}Photo: {asset.credit}
    </p>
  );
}
