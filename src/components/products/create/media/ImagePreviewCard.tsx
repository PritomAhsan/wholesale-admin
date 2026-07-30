"use client";

import Image from "next/image";
import { Star, Trash2 } from "lucide-react";
import { ProductImage } from "@/types/media";

type Props = {
    image: ProductImage;
    onDelete: () => void;
    onPrimary: () => void;
};

export default function ImagePreviewCard({
    image,
    onDelete,
    onPrimary,
}: Props) {
    return (
        <div className="group relative">
            <div className="overflow-hidden rounded-xl border bg-white">

                <div className="relative aspect-square">

                    <Image
                        src={image.preview}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                    />

                    {
                        image.isPrimary && (

                            <div className="absolute left-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-xs text-white">

                                Primary

                            </div>

                        )
                    }

                </div>

                <div className="flex items-center justify-between p-3">

                    <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">

                        <button
                            onClick={onPrimary}
                            className="rounded-lg bg-white p-2 shadow"
                        >
                            <Star size={16} />
                        </button>

                        <button
                            onClick={onDelete}
                            className="rounded-lg bg-red-500 p-2 text-white shadow"
                        >
                            <Trash2 size={16} />
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}