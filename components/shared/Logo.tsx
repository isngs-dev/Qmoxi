import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

/**
 * Original Qmoxi logo lockup (gold), extracted to a transparent PNG from the
 * source JPG so it sits cleanly on any dark surface.
 */
export function Logo({ className, priority, height = 48 }: { className?: string; priority?: boolean; height?: number }) {
  const width = Math.round(height * (900 / 530));
  return (
    <Link href="/" aria-label="Qmoxi — home" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src="/images/brand/qmoxi-logo.png"
        alt="Qmoxi — AI software innovator"
        width={width}
        height={height}
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        sizes={`${width}px`}
        style={{ height, width }}
      />
    </Link>
  );
}

/** Circular gold "Q" emblem cropped from the original logo. */
export function Emblem({ size = 64, className, alt = "" }: { size?: number; className?: string; alt?: string }) {
  return (
    <Image
      src="/images/brand/qmoxi-emblem.png"
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      className={cn("rounded-full", className)}
    />
  );
}
