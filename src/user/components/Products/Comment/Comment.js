import React from "react";
import "./Comment.css";
import StarRatingComponent from 'react-star-rating-component';
import { FaStar } from "react-icons/fa";

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
          };
      }

    render(){
        return(
            <>
                <div>
                    <h3> Tên người dùng</h3>
                    <h2>Rating from state: </h2>
                        <StarRatingComponent 
                        name="rate2" 
                        editing={false}
                        renderStarIcon={() => <span>*</span>}
                        starCount={5}
                        value={4}
                        />
                    <p> Đánh giá </p>
                </div>
            </>
        )
    }

}