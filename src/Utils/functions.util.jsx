// functions.util.js

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser, logout } from "../Store/Slices/userSlice";
import { toast } from "react-toastify";
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
  return price?.toLocaleString("en-US", options) || 0;
}

export const formatTime = (time24) => {
  // Split the input time into hours and minutes
  const [hour, minute] = time24.split(":");

  // Convert hour to a number for comparison
  let hourNum = parseInt(hour);

  // Determine AM or PM
  const period = hourNum >= 12 ? "PM" : "AM";

  // Adjust the hour for 12-hour format
  hourNum = hourNum % 12 || 12; // Converts 0 or 12 -> 12

  // Return formatted time (without seconds)
  return `${hourNum}:${minute} ${period}`;
};

export const getNextDayDate = (dayName) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const targetDayIndex = daysOfWeek.indexOf(dayName);

  if (targetDayIndex === -1) {
    throw new Error("Invalid day name");
  }

  const currentDayIndex = today.getDay();
  let daysToAdd = targetDayIndex - currentDayIndex;

  if (daysToAdd <= 0) {
    daysToAdd += 7; // Ensure the next occurrence of the day is in the future
  }

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysToAdd);

  // Format the date as YYYY-MM-DD
  const year = nextDate.getFullYear();
  const month = (nextDate.getMonth() + 1).toString().padStart(2, "0");
  const day = nextDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// make a function to scroll to top smoothly
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
