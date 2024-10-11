import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  const ratingText = `${text} reviews`;
  return (
    <div className="rating">
      {/* if value is greater than or equal to 1, 2, 3, 4, 5, display a full star icon
          if value is greater than or equal to 0.5, 1.5, 2.5, 3.5, 4.5 display a half star icon
          if value is less than 0.5, display an empty star icon */}
      <span>
        {value >= 1 ? (
          <FaStar />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      {/* if ratingText is true, display the ratingText */}
      <span className="rating-text">{ratingText && ratingText}</span>
    </div>
  );
};

export default Rating;
