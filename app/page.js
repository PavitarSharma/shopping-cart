"use client";

import Pagination from "@/components/Pagination";
import Product from "@/components/Product";
import useProducts from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { IoFilterOutline } from "react-icons/io5";
import useDebounce from "@/hooks/useDebounce";
import { ProductFilterSidebar } from "@/components/ProductFilter";
import { useSelector } from "react-redux";
import { ProductState } from "@/store/slices/productSlice";

const Home = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm);
  const { category, orderBy, sortBy } = useSelector(ProductState);
  const skip = (page - 1 + 1) * limit;

  const { data, loading, error } = useProducts(limit, skip, debounceSearch, sortBy, orderBy, category);
  const { products } = data;
  const totalPages = Math.round(data?.total / limit);
  return (
    <div className="flex gap-6 py-16 md:px-6 px-4">
      <div className="w-72 bg-white h-max rounded border lg:block hidden">
        <ProductFilterSidebar />
      </div>

      <div className="flex-1">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="relative border border-gray-200 rounded bg-white h-12 max-w-xl w-full">
              <LuSearch className="text-lg absolute left-2 top-1/2 -translate-y-1/2 opacity-70" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full h-full pl-9 pr-2 border-0 outline-0 rounded"
              />
            </div>
            <div className="lg:hidden block">
              <button className="bg-white rounded px-4 py-3 text-xl border">
                <IoFilterOutline />
              </button>
            </div>
          </div>

          <div className="lg:hidden block w-full h-max shadow-sm rounded p-4 bg-white mt-4"></div>
        </div>

        {loading ? (
          <ProductLoadingSkeleton />
        ) : products?.length > 0 ? (
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 min-[642px]:grid-cols-2 gap-4 w-full">
            {products?.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        ) : (
          <div>No product found</div>
        )}

        <div className="py-8">
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            limits={["10", "15", "20", "25", "30"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

const ProductLoadingSkeleton = () => {
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 min-[642px]:grid-cols-2 gap-4 w-full">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="rounded relative  pt-4 bg-white shadow animate-pulse"
        >
          <div className="w-[90%] h-[300px] bg-gray-200/60 rounded mx-auto"></div>
          <div className="absolute top-4 right-4 opacity-50 w-10 h-10 rounded-full bg-gray-200"></div>

          <div className="mt-4 p-4">
            <div className="w-14 h-4 bg-gray-200 rounded"></div>
            <div className="w-4/5 my-2 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/2 my-2 h-4 bg-gray-200 rounded"></div>

            <div className="flex items-center justify-between">
              <div className="w-[30%] my-2 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 my-2 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
