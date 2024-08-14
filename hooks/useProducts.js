import { useEffect, useState } from "react";
import axios from "axios";

const useProducts = (limit, skip, q, sortBy, order, category) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);


  useEffect(() => {
    setLoading(true);
    const fetchedProducts = async () => {
      let url = "https://dummyjson.com/products";
      let params = [];

      if (q) {
        // If there's a search query, use the search endpoint
        url = `https://dummyjson.com/products/search?q=${q}`;
      } else {
        // Otherwise, use the standard endpoint
        url = "https://dummyjson.com/products";
        if (limit) params.push(`limit=${limit}`);
        if (skip) params.push(`skip=${skip}`);
        if (sortBy) params.push(`sortBy=${sortBy}`);
        if (order) params.push(`order=${order}`);
        if (category)
          url = `https://dummyjson.com/products/category/${category}`;

        if (params.length) {
          url += `?${params.join("&")}`;
        }
      }

      console.log(url);
      

      try {
        const response = await axios.get(url);

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchedProducts();
  }, [limit, skip, q, sortBy, category, order]);

  return {
    loading,
    error,
    data,
  };
};

export default useProducts;
