"use client";

import CreateProductManager
from "../create/CreateProductManager";

import useProduct
from "./hooks/useProduct";

interface Props {

  uuid: string;

}

export default function EditProductManager({

  uuid,

}: Props) {

  const {

    product,

    loading,

    error,

    reload,

  } = useProduct(uuid);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-10">

        Loading Product...

      </div>

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (error) {

    return (

      <div className="rounded-xl border border-red-200 bg-red-50 p-10">

        <p>{error}</p>

        <button

          onClick={reload}

          className="mt-4 rounded bg-brand-500 px-4 py-2 text-white"

        >

          Retry

        </button>

      </div>

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Product Not Found
  |--------------------------------------------------------------------------
  */

  if (!product) {

    return (

      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-10">

        Product not found.

      </div>

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Render Existing Form
  |--------------------------------------------------------------------------
  */

  return (

    <CreateProductManager

      mode="edit"

      product={product}

    />

  );

}