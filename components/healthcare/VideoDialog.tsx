"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Play, X, ArrowUpRight } from "lucide-react";
import { EXTERNAL } from "@/lib/constants/site";

/**
 * "Confused caller" video from the original site. The Vimeo iframe is only
 * created once the dialog is opened, so it costs nothing on page load.
 */
export function VideoDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Close if this route is hidden by Activity (e.g. browser back while open).
  useLayoutEffect(() => {
    const dialog = ref.current;
    return () => dialog?.close();
  }, []);

  const show = () => {
    setOpen(true);
    ref.current?.showModal();
  };
  const close = () => {
    ref.current?.close();
  };

  return (
    <>
      <button
        type="button"
        onClick={show}
        className="group inline-flex h-14 items-center gap-3 rounded-full pl-2 pr-5 text-sm font-semibold text-gold transition-colors hover:text-gold-300"
      >
        <span className="flex size-10 items-center justify-center rounded-full border border-gold/50 transition-colors group-hover:bg-gold group-hover:text-black">
          <Play aria-hidden className="size-4 translate-x-px" />
        </span>
        Watch: the confused caller
      </button>
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === ref.current && close()}
        aria-label="Video: Confused caller"
        className="m-auto w-[min(92vw,1100px)] max-w-none overflow-visible bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="relative overflow-hidden rounded-2xl bg-black ring-1 ring-gold/30">
          <div className="aspect-video w-full">
            {open && (
              <iframe
                src={`${EXTERNAL.confusedCallerVideo.replace("#", "&autoplay=1#")}`}
                title="Confused caller — why legacy IVR frustrates patients"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            )}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <a
            href={EXTERNAL.confusedCallerVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-mist hover:text-gold"
          >
            Open on Vimeo <ArrowUpRight aria-hidden className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <button
            type="button"
            onClick={close}
            autoFocus
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-gold hover:bg-gold hover:text-black"
          >
            <X aria-hidden className="size-4" /> Close
          </button>
        </div>
      </dialog>
    </>
  );
}
