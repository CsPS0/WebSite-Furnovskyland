"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { X } from "lucide-react";

/** Thumbnails that open full size in a native <dialog> (Esc and backdrop click close it). */
export function Gallery({ images }: { images: StaticImageData[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<StaticImageData | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <button
            key={img.src}
            onClick={() => {
              setOpen(img);
              dialog.current?.showModal();
            }}
            className="reveal overflow-hidden rounded-lg shadow-md transition hover:scale-[1.02] hover:shadow-lg"
          >
            <Image src={img} alt="" placeholder="blur" className="h-64 w-full object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="m-auto max-h-[90dvh] max-w-[90vw] bg-transparent backdrop:bg-black/90"
      >
        <button onClick={() => dialog.current?.close()} aria-label="Close" className="fixed top-4 right-6 text-white hover:text-secondary">
          <X className="size-10" />
        </button>
        {open && <Image src={open} alt="" className="max-h-[90dvh] w-auto rounded-lg" />}
      </dialog>
    </>
  );
}
