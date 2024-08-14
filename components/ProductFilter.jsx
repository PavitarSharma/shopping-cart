"use client";

import useCategories from "@/hooks/useCategories";
import { ProductState, setCategory, setOrderBy, setSortBy } from "@/store/slices/productSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const ProductFilterSidebar = () => {
  const dispatch = useDispatch();
  const { category, orderBy, sortBy } = useSelector(ProductState);
  const { categories } = useCategories();

  
  return (
    <div className="w-full h-full p-4">
      <div className="">
        <p className="text-xl opacity-70">Category</p>
        <div className="space-y-4 pl-2 ">
          {categories?.map((obj, index) => (
            <div key={index} className="my-2 flex items-center gap-2">
              <div
              onClick={() => dispatch(setCategory(obj?.name))}
                className={`cursor-pointer w-5 h-5 rounded-full flex items-center justify-center ${
                  obj?.name === category ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
              <span>{obj?.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4">
        <p className="text-xl opacity-70">Order by</p>
        <div className="space-y-4 pl-2 ">
          {["asc", "desc"]?.map((obj, index) => (
            <div key={index} className="my-2 flex items-center gap-2">
              <div
              onClick={() => dispatch(setOrderBy(obj))}
                className={` cursor-pointer w-5 h-5 rounded-full flex items-center justify-center ${
                  obj === orderBy ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
              <span className="capitalize">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4">
        <p className="text-xl opacity-70">Sort by</p>
        <div className="space-y-4 pl-2 ">
          {["title", "price"]?.map((obj, index) => (
            <div key={index} className="my-2 flex items-center gap-2">
              <div
              onClick={() => dispatch(setSortBy(obj))}
                className={` cursor-pointer w-5 h-5 rounded-full flex items-center justify-center ${
                  obj === sortBy ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
              <span className="capitalize">{obj}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
