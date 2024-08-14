const { FaRegStarHalfStroke, FaStar, FaRegStar } = require("react-icons/fa6");

const StarRating = ({ rating, maxStars = 5, readOnly = true }) => {
  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starValue = index + 1;
    const isFull = rating >= starValue;
    const isHalf = rating >= starValue - 0.5 && rating < starValue;

    return (
      <span
        key={index}
        className={`inline-block text-lg ${
          isFull
            ? "text-yellow-400"
            : isHalf
            ? "text-yellow-400"
            : "text-gray-300"
        }`}
      >
        {isHalf ? <FaRegStarHalfStroke /> : isFull ? <FaStar /> : <FaRegStar />}
      </span>
    );
  });

  return (
    <div className={`flex ${readOnly ? "pointer-events-none" : ""}`}>
      {stars}
    </div>
  );
};

export default StarRating;
