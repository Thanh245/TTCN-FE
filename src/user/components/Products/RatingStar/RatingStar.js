import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

function StarRating(setSao) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <>
        <div className = "row">
        
        <div className="label col-4">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <>
              <FaStar
                rating={rating}
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                    setRating(ratingValue)
                    setSao(ratingValue)
                }}
              />
            </>
          )
        })}
        
      </div>
      <div className = "col-8">
        <p> Bạn đánh giá {rating} * cho sản phẩm này</p>
        </div>
      </div></>
    );
  };
  
  export default StarRating;
  

























