import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageCount: 10,
            activePage: 1
          };
      }

    render() {
        return (
            <div className="container">
            <div className="navPage" >
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    activePage={this.state.activePage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    // onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
            </div>
        )
    }
}