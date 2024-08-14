"use client";

import {
  CartState,
  clearCart,
  decrementCartQuantity,
  getSubTotalPrice,
  getTotalDiscountPercentage,
  getTotalPrice,
  incrementCartQuantity,
  removeProductFromCart,
} from "@/store/slices/cartSlice";
import { discountPrice, formatPrice } from "@/utils/helper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { carts } = useSelector(CartState);
  const subTotal = useSelector(getSubTotalPrice);
  const totalDiscount = useSelector(getTotalDiscountPercentage);
  const totalPrice = useSelector(getTotalPrice);

  const handleIncrementCartQuantity = (product, quantity) => {
    if (quantity >= product?.stock) {
      toast.error("Product quantity is out of range.");
      return;
    }

    dispatch(incrementCartQuantity({ productId: product?.id }));
  };

  const handleDecrementCartQuantity = (productId) => {
    dispatch(decrementCartQuantity({ productId }));
  };

  const handleCheckout = () => {
    toast.success("Order placed successfully");
    dispatch(clearCart());
  };

  return (
    <div className="md:px-6 px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="sm:text-4xl text-2xl font-bold">
          Your Shopping cart ({carts.length} items)
        </h1>
        {carts.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="px-4 py-2.5 border border-red-600 text-red-600 rounded"
          >
            Clear cart
          </button>
        )}
      </div>

      <div className="flex lg:flex-row flex-col gap-6 my-8">
        <div className="flex-1 h-max space-y-4 bg-white rounded p-4 shadow-sm">
          {carts.length > 0
            ? carts?.map(({ product, quantity }, index) => (
                <div key={index}>
                  <div
                    key={index}
                    className="w-full hidden md:grid grid-cols-6 border rounded p-4"
                  >
                    <div className="flex items-center gap-2 col-span-2">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={120}
                        height={120}
                        className="rounded"
                      />
                      <p className="font-medium">{product.title}</p>
                    </div>
                    <p className="m-auto col-span-2">
                      {" "}
                      {product.discountPercentage
                        ? formatPrice(
                            discountPrice(
                              product.price,
                              product.discountPercentage
                            ) * quantity
                          )
                        : formatPrice(product.price * quantity)}
                    </p>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrementCartQuantity(product.id)}
                        className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-l"
                      >
                        <LuMinus />
                      </button>
                      <span className="w-10 h-10 bg-primary text-white flex items-center justify-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrementCartQuantity(product, quantity)
                        }
                        className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-r"
                      >
                        <LuPlus />
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        dispatch(
                          removeProductFromCart({ productId: product.id })
                        )
                      }
                      className="text-red-600 text-2xl ml-auto"
                    >
                      <LuTrash2 />
                    </button>
                  </div>

                  <div
                    key={index}
                    className="w-full  md:hidden border rounded px-4"
                  >
                    <div className="flex items-center gap-2 flex-col p-2">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={120}
                        height={120}
                        className="rounded"
                      />
                      <p className="font-medium">{product.title}</p>
                    </div>
                    <div className="flex items-center justify-between w-full my-4">
                      <p className="">
                        {" "}
                        {product.discountPercentage
                          ? formatPrice(
                              discountPrice(
                                product.price,
                                product.discountPercentage
                              ) * quantity
                            )
                          : formatPrice(product.price * quantity)}
                      </p>
                      <div className="flex items-center ml-auto">
                        <button
                          onClick={() =>
                            handleDecrementCartQuantity(product.id)
                          }
                          className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-l"
                        >
                          <LuMinus />
                        </button>
                        <span className="w-10 h-10 bg-primary text-white flex items-center justify-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleIncrementCartQuantity(product, quantity)
                          }
                          className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-r"
                        >
                          <LuPlus />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          dispatch(
                            removeProductFromCart({ productId: product.id })
                          )
                        }
                        className="text-red-600 text-2xl ml-auto"
                      >
                        <LuTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : <div className="flex flex-col justify-center items-center h-64">
              <HiOutlineShoppingBag size={62} className="opacity-40" />
              <p className="text-xl my-2">Your cart is empty!</p>
              <button onClick={() => router.push("/")} className="py-3 px-4 rounded bg-primary text-white font-medium">Continue shopping</button>
              </div>}
        </div>

        <div className="lg:w-[350px] w-full h-max bg-white shadow-sm rounded p-4">
          <h1 className="text-xl font-semibold">Order Summary</h1>
          <div className="my-4 flex items-center justify-between">
            <span className="opacity-40 text-lg font-medium">Sub Total</span>
            <span>{formatPrice(subTotal)}</span>
          </div>
          <div className="my-4 flex items-center justify-between">
            <span className="opacity-40 text-lg font-medium">Discount</span>
            <span>{Number(totalDiscount).toFixed(2)}%</span>
          </div>
          <div className="my-4 flex items-center justify-between">
            <span className="opacity-40 text-lg font-medium">Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="py-3 px-4 w-full bg-primary rounded text-white font-medium mt-6"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
