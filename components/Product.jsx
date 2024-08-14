"use client";

import { discountPrice, formatPrice } from "@/utils/helper";
import Image from "next/image";
import React from "react";
import { FaBasketShopping } from "react-icons/fa6";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { LuMinus, LuPlus } from "react-icons/lu";
import StarRating from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  CartState,
  decrementCartQuantity,
  incrementCartQuantity,
} from "@/store/slices/cartSlice";
import { toast } from "react-toastify";
import {
  addProductToWishlist,
  ProductState,
  removeProductFromWishlist,
} from "@/store/slices/productSlice";
import Link from "next/link";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { carts } = useSelector(CartState);
  const { wishlists } = useSelector(ProductState);

  const hasProductInCart = carts.find((p) => p.product.id === product?.id);
  const quantityInCart = hasProductInCart ? hasProductInCart.quantity : 0;

  const handleAddProductToCart = () => {
    dispatch(addProductToCart({ product }));
    toast.success("Product added to cart.");
  };

  const handleIncrementCartQuantity = () => {
    if (quantityInCart >= product?.stock) {
      toast.error("Product quantity is out of range.");
      return;
    }

    dispatch(incrementCartQuantity({ productId: product?.id }));
  };

  const handleDecrementCartQuantity = () => {
    dispatch(decrementCartQuantity({ productId: product?.id }));
  };

  const handleAddProductToWishlist = () => {
    dispatch(addProductToWishlist({ product }));
    toast.success("Product added to wishlist.");
  };

  const handleRemoveProductFromWishlist = () => {
    dispatch(removeProductFromWishlist({ productId: product?.id }));
    toast.success("Product removed from wishlist.");
  };

  const isInWishlist = wishlists.find((p) => p.id === product?.id);

  const handleToogleWishlish = () => {
    if (isInWishlist) {
      handleRemoveProductFromWishlist();
    } else {
      handleAddProductToWishlist();
    }
  };

  return (
    <div className="bg-white rounded shadow-sm relative">
      <Link href={`/product/${product.id}`}>
        <Image
          src={product?.thumbnail}
          alt={product?.title}
          width={200}
          height={200}
          className="w-full h-[300px] object-contain"
        />
      </Link>
      <button onClick={handleToogleWishlish} className="absolute right-4 top-4">
        {isInWishlist ? (
          <BsHeartFill size={26} className="opacity-25" />
        ) : (
          <BsHeart size={26} className="opacity-25" />
        )}
      </button>

      <div className="p-4">
        <span className="opacity-60 text-sm">{product?.brand}</span>
        <p className="my-2 line-clamp-1 text-sm font-medium">
          {product?.title}
        </p>
        <StarRating rating={product?.rating} readOnly={true} />
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              {formatPrice(
                discountPrice(product?.price, product?.discountPercentage)
              )}
            </span>
            <del className="text-sm opacity-70">
              {formatPrice(product?.price)}
            </del>
            <span className="text-green-700 font-medium text-sm">
              {product?.discountPercentage}% off
            </span>
          </div>
          {hasProductInCart ? (
            <div className="flex items-center">
              <button
                onClick={handleDecrementCartQuantity}
                className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-l"
              >
                <LuMinus />
              </button>
              <span className="w-8 h-8 bg-primary text-white flex items-center justify-center">
                {quantityInCart}
              </span>
              <button
                onClick={handleIncrementCartQuantity}
                className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-r"
              >
                <LuPlus />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddProductToCart}
              className="bg-primary text-white text-xl px-4 py-2.5 rounded-full"
            >
              <FaBasketShopping />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
