"use client";

import StarRating from "@/components/StarRating";
import {
  addProductToCart,
  CartState,
  decrementCartQuantity,
  incrementCartQuantity,
} from "@/store/slices/cartSlice";
import {
  addProductToWishlist,
  ProductState,
  removeProductFromWishlist,
} from "@/store/slices/productSlice";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsCheck, BsHeart, BsHeartFill } from "react-icons/bs";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductDetailPage = ({ params: { id } }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const { carts } = useSelector(CartState);
  const { wishlists } = useSelector(ProductState);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://dummyjson.com/product/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return null;

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

  const handleToggleWishlish = () => {
    if (isInWishlist) {
      handleRemoveProductFromWishlist();
    } else {
      handleAddProductToWishlist();
    }
  };

  const buttonClass =
    "w-12 h-12 bg-primary text-white flex items-center justify-center";

  return (
    <div className="py-16 md:px-6 px-4">
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
        <div className="md:w-[600px] md:h-[600px] sm:w-[500px] sm:h-[500px] h-[300px] bg-white rounded p-4 shadow-sm mx-auto relative">
          <Image
            src={product?.thumbnail}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-full object-contain rounded"
          />
          <button
            onClick={handleToggleWishlish}
            className="absolute right-4 top-4"
          >
            {isInWishlist ? (
              <BsHeartFill size={26} className="opacity-25" />
            ) : (
              <BsHeart size={26} className="opacity-25" />
            )}
          </button>
        </div>

        <div className="bg-white shadow-sm p-4 rounded h-max">
          <h1 className="sm:text-3xl text-2xl font-semibold">
            {product.title}
          </h1>
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} readOnly />
            <p className="my-2">({product.reviews.length} customer review)</p>
          </div>

          <div className="flex items-center justify-between gap-2 my-2">
            <div className="flex items-center gap-1">
              <span className="font-medium">SKU:</span>
              <span>{product.sku}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Brand:</span>
              <span>{product.brand}</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-medium">Return:</span>
              <span>{product.returnPolicy}</span>
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-center justify-between">
              <span>Sold</span>
              <span>{product.stock}</span>
            </div>
            <div className="w-full h-5 mt-1 border border-gray-300 rounded-full">
              <div
                style={{
                  width: `${(quantityInCart / product.stock) * 100}%`,
                }}
                className={`h-full bg-primary rounded-full`}
              ></div>
            </div>
          </div>

          <p className="text-sm opacity-80 my-2">{product.description}</p>

          <div className="space-y-4 my-3">
            <div className="flex items-center gap-2">
              <BsCheck className="text-2xl text-green-600" />
              <span className="text-sm">{product.warrantyInformation}</span>
            </div>
            <div className="flex items-center gap-2">
              <BsCheck className="text-2xl text-green-600" />
              <span className="text-sm">{product.shippingInformation}</span>
            </div>
            <div className="flex items-center gap-2">
              <BsCheck className="text-2xl text-green-600" />
              <span className="text-sm">{product.shippingInformation}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 my-4">
            <div
              className={`px-4 py-3 ${
                product.stock === quantityInCart ? "bg-red-600" : "bg-green-600"
              } text-white rounded`}
            >
              {product.stock === quantityInCart ? "Out of Stock" : "In Stock"}
            </div>
            {hasProductInCart ? (
              <div className="flex items-center">
                <button
                  onClick={handleDecrementCartQuantity}
                  className={`${buttonClass} rounded-l`}
                >
                  <LuMinus />
                </button>
                <span className={`${buttonClass}`}>{quantityInCart}</span>
                <button
                  onClick={handleIncrementCartQuantity}
                  className={`${buttonClass} rounded-r`}
                >
                  <LuPlus />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddProductToCart}
                className={`px-4 py-3 rounded bg-primary text-white  font-medium`}
              >
                Add To Cart
              </button>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <Image
              src={product.meta?.qrCode}
              alt="qrCode"
              width={120}
              height={120}
              className="rounded object-cover"
            />
            <p>{product.meta?.barcode}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm p-4 my-16 w-full flex gap-6">
        <div className="flex-1 space-y-6">
          {product.reviews?.map((review, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center tetx-lg font-medium bg-primary/20">
                {review.reviewerName.substring(0, 1)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 justify-between">
                  <p className="font-medium">{review.reviewerName}</p>
                  <p className="text-sm opacity-70">
                    {dayjs(review.date).format("MMM DD, YYYY")}
                  </p>
                </div>
                <div>
                  <StarRating rating={review.rating} readOnly />
                  <p className="mt-2 text-sm">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

//https://xstore.8theme.com/elementor3/grocery-mega-market/product/raw-natural-strawberry/
