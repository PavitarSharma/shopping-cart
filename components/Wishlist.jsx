import {
  addAllProductToCart,
  addProductToCart,
  CartState,
  decrementCartQuantity,
  incrementCartQuantity,
} from "@/store/slices/cartSlice";
import {
  ProductState,
  removeAllWishlists,
  removeProductFromWishlist,
} from "@/store/slices/productSlice";
import { discountPrice, formatPrice } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
import { FaBasketShopping } from "react-icons/fa6";
import { LuMinus, LuPlus, LuTrash2, LuX } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Wishlist = ({ onClose }) => {
  const dispatch = useDispatch();
  const { wishlists } = useSelector(ProductState);
  const { carts } = useSelector(CartState);

  const hasProductInCart = (product) =>
    carts.find((p) => p.product.id === product?.id);
  const quantityInCart = (product) =>
    hasProductInCart(product) ? hasProductInCart(product).quantity : 0;

  const handleAddProductToCart = (product) => {
    dispatch(addProductToCart({ product }));
    dispatch(removeProductFromWishlist({ productId: product.id }));
    toast.success("Product added to cart.");
  };

  const handleIncrementCartQuantity = (product) => {
    if (quantityInCart >= product.stock) {
      toast.error("Product quantity is out of range.");
      return;
    }

    dispatch(incrementCartQuantity({ productId: product.id }));
  };

  const handleDecrementCartQuantity = (productId) => {
    dispatch(decrementCartQuantity({ productId: productId }));
  };

  const handleAllItemToCart = () => {
    dispatch(addAllProductToCart({ products: wishlists }));

    dispatch(removeAllWishlists());
    toast.success("All wishlisted products added to cart.");
    onClose();
  };

  const handleClearWishlist = () => {
    dispatch(removeAllWishlists());
    toast.success("All products removed from wishlist.");
  };

  const handleRemoveProductFromWishlist = (productId) => {
    dispatch(removeProductFromWishlist({ productId }));
    toast.success("Product removed from wishlist.");
  };

  const handleClick = useCallback(() => {
    setTimeout(() => onClose, 200);
  }, [onClose]);
  return (
    <div className="fixed inset-0 bg-black/30 z-50">
      <div className="fixed right-0 bottom-0 top-0 h-screen bg-white w-80 rounded-l">
        <div className="p-4 h-16 flex items-center justify-between border-b">
          <h3 className="font-semibold text-xl">Wishlists</h3>
          <button onClick={onClose} className="text-xl">
            <LuX />
          </button>
        </div>
        <div className="h-[calc(100%_-_13rem)] overflow-y-auto scrollbar py-4 space-y-4">
          {wishlists.length > 0 ? (
            wishlists.map((product, index) => (
              <div key={index} className="px-4 relative  py-2 border-b">
                <button
                  onClick={() => handleRemoveProductFromWishlist(product.id)}
                  className="absolute right-2 text-red-600"
                >
                  <LuTrash2 />
                </button>
                <div className="flex items-center gap-2">
                  <Link href={`/product/${product.id}`} onClick={handleClick}>
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                  </Link>
                  <p className="text-xs">{product.title}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {formatPrice(
                        discountPrice(product.price, product.discountPercentage)
                      )}
                    </span>

                    <sup className="text-green-700 font-medium text-xs">
                      {product.discountPercentage}% off
                    </sup>
                  </div>
                  {hasProductInCart(product) ? (
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrementCartQuantity(product.id)}
                        className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-l"
                      >
                        <LuMinus />
                      </button>
                      <span className="w-8 h-8 bg-primary text-white flex items-center justify-center">
                        {quantityInCart(product)}
                      </span>
                      <button
                        onClick={() => handleIncrementCartQuantity(product)}
                        className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-r"
                      >
                        <LuPlus />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddProductToCart(product)}
                      className="bg-primary text-white px-3 py-2 rounded-full"
                    >
                      <FaBasketShopping />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>
              <p className="text-center py-4">No wishlist items found.</p>
            </div>
          )}
        </div>
        {wishlists.length > 0 && (
          <div className="h-36 border-t p-4 space-y-2">
            <button
              onClick={handleClearWishlist}
              className="w-full font-medium rounded py-2.5 border"
            >
              Clear Wistlist
            </button>
            <button
              onClick={handleAllItemToCart}
              className="w-full bg-primary text-white font-medium rounded py-2.5"
            >
              Add All To cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
