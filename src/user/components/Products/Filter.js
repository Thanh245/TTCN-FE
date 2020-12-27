import React from "react";
import PriceButton from "./PriceButton";
import DropList from "./DropList";

export default class Filter extends React.Component {

  render() {
    return (
        <div className="row">
            <div className="col-3">
                <DropList />
            </div>
            <div className="col-9">
              <PriceButton to={1000000}/>
              <PriceButton from={1000000} to={3000000}/>
              <PriceButton from={3000000}/>
            </div>
        </div>
           
    );
  }
}

