import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils/helper";
const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceSearch = useDebounce(searchTerm);

  useEffect(() => {
    setLoading(true);
    const fetchedProducts = async () => {
      try {
        let url = "https://dummyjson.com/products/search";

        if (debounceSearch) {
          url += `q=${debounceSearch}`;
        }
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchedProducts();
  }, [debounceSearch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = () => {
    setTimeout(() => {
      setSearchTerm("");
      setProducts([]);
    }, 200);
  };

  return (
    <div className="relative border border-gray-300 rounded h-12 w-auto p-1 ">
      <LuSearch className="absolute top-1/2 -translate-y-1/2 right-4 text-xl opacity-90" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="w-full h-full outline-none border-none pl-3 pr-8 rounded"
      />

      {searchTerm.length >= 1 && (
        <div className="w-full absolute left-0 top-[52px] right-0 rounded max-h-[350px] bg-white shadow border border-gray-300 z-10 overflow-y-auto scrollbar flex flex-col gap-2">
          {loading ? (
            <div>Loading...</div>
          ) : products?.products?.length > 0 ? (
            products?.products?.map((product, index) => (
              <Link
                onClick={handleClick}
                href={`/product/${product.id}`}
                key={index}
                className="flex items-center justify-between hover:bg-gray-100 px-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={product?.thumbnail}
                    alt={product?.title}
                    width={70}
                    height={70}
                    className="rounded"
                  />
                  <span className="line-clamp-2 text-sm">{product.title}</span>
                </div>
                <span className="font-medium">
                  {formatPrice(product?.price)}
                </span>
              </Link>
            ))
          ) : (
            <div className="text-center h-14 flex items-center justify-center">
              No result found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
