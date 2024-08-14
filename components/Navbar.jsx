"use client";

import Link from "next/link";
import { LuHeart, LuUserCircle2 } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Searchbar from "./Searchbar";
import { useSelector } from "react-redux";
import { CartState, getTotalPrice } from "@/store/slices/cartSlice";
import { formatPrice } from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import { ProductState } from "@/store/slices/productSlice";
import Wishlist from "./Wishlist";
import { useCallback, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { carts } = useSelector(CartState);
  const { wishlists } = useSelector(ProductState);
  const totalPrice = useSelector(getTotalPrice);
  const [openWishlist, setOpenWishlist] = useState(false);

  const handleOpenWishlist = useCallback(
    () => setOpenWishlist((prev) => !prev),
    []
  );

  return (
    <header className="w-full bg-white border-b md:py-6 py-3">
      <div className="flex items-center justify-between md:px-6 px-4 gap-4">
        <Link href="/" className="text-3xl font-bold text-primary block">
          My Store
        </Link>
        {pathname === "/" && (
          <div className="flex-1 md:block hidden">
            <Searchbar />
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 hover:opacity-70 transition cursor-pointer">
            <LuUserCircle2 size={28} />
            <span className="font-medium lg:inline hidden">Sign In</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-300 rounded md:block hidden"></div>

          <div className="relative flex items-center gap-2 group cursor-pointer">
            <div onClick={handleOpenWishlist} className="relative">
              <LuHeart size={28} />
              <div className="absolute -top-2 -right-2 flex items-center justify-center bg-primary text-white rounded-full text-xs font-medium w-5 h-5">
                {wishlists.length}
              </div>
            </div>
            <span className="group-hover:opacity-70 transition font-medium lg:inline hidden">
              Wishlist
            </span>
          </div>
          <div className="h-8 w-[1px] bg-gray-300 rounded md:block hidden"></div>
          <div
            onClick={() => router.push("/cart")}
            className="relative flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative">
              <HiOutlineShoppingBag size={28} />
              <div className="absolute -top-2 -right-2 flex items-center justify-center bg-primary text-white rounded-full text-xs font-medium w-5 h-5">
                {carts.length}
              </div>
            </div>
            <span className="group-hover:opacity-70 transition font-medium lg:inline hidden">
              Cart {formatPrice(totalPrice)}
            </span>
          </div>
        </div>
      </div>
      {pathname === "/" && (
        <div className="w-full md:hidden block px-4 mt-4">
          <Searchbar />
        </div>
      )}
      {openWishlist && <Wishlist onClose={handleOpenWishlist} />}
    </header>
  );
};

export default Navbar;
