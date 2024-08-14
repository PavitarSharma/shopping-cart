export const formatPrice = (price) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const discountPrice = (price, off) =>  {
  const discount = (off / 100) * price;
  return price - discount;
}
