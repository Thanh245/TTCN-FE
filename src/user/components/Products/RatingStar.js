import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Product.css";

const StarRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
      <div className="label">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <>
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(ratingValue)}
              />
            </>
          )
        })}
        <p> Bạn đánh giá {rating} * cho sản phẩm này</p>
      </div>
    );
  };
  
  export default StarRating;
  

























