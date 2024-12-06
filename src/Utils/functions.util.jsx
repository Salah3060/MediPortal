// functions.util.js

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Utility function to render star ratings
export const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating); // Full stars
  const halfStar = rating % 1 !== 0; // Check if there's a half star
  const emptyStars = 5 - Math.ceil(rating); // Remaining empty stars

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-600" />);
  }

  // Add half star if applicable
  if (halfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-600" />);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-600" />);
  }

  return stars;
};

export const formatDate = (dateString) => {
  if (!dateString) return "Invalid date";

  // Parse the input string to a JavaScript Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date)) return "Invalid date";

  // Format the date parts
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};
export function formatPrice(price) {
  const options = {
    style: "currency",
    currency: "USD",
  };
  return price.toLocaleString("en-US", options);
}
