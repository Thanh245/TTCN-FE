import React from "react";
import "./Comment.css";
import RatingStar from "../RatingStar/RatingStar"

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
                    <RatingStar />
                    <p> Đánh giá </p>
                </div>
            </>
        )
    }

}