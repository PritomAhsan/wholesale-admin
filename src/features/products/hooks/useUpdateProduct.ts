"use client";

import { useState } from "react";

import ProductService from "@/api/services/product.service";

export default function useUpdateProduct() {

    const [loading, setLoading] =
        useState(false);

    const update = async (
        uuid: string,
        payload: FormData
    ) => {

        try {

            setLoading(true);

            const product =
                await ProductService.update(
                    uuid,
                    payload
                );

            return product;

        } finally {

            setLoading(false);

        }

    };

    return {

        loading,

        update,

    };

}