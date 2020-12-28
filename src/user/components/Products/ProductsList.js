import React from "react";
import Filter from './Filter/Filter'
import List from './List/List';
// import Pagination from './Pagination/Pagination'
import {  fetchItemsList, fetchItemsListFilter,fetchItemsListByType } from "../../services/ItemService";
import history from "../../../history";

export default class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            // cart: [],
            // search: "",
            // to: 0,
            // from: 0,
            // loaiMatHangList: [],
          };
      }

    getList = async() => {
        const res = await fetchItemsList();
        if (res.status === 200) {
            this.setState({
              ...this.state,
              products: res.data.data
            })
        }
    }

    getFilter = async(from, to) => {
      const path = `/productslist/filter/price/${from}/${to}`
      history.push(path)
      const filter = `?giaBatDau=${from}&giaKetThuc=${to}`
      const res = await fetchItemsListFilter(filter);
      if (res.status === 200) {
          this.setState({
            ...this.state,
            products: res.data.data,
            loading: false
          })
      }
    }
    
    getItemsListFilter = async(filter) =>{
        const res = await fetchItemsListFilter(filter);
        if (res.status === 200) {
          this.setState({
            ...this.state,
            products: res.data.data,
            loading: false
          })
      }
    }
    getItemsListByType = async(id) => {
      history.push(`/productslist/filter/type/${id}`)
      const res = await fetchItemsListByType(id);
      if (res.status === 200) {
        this.setState({
            ...this.state,
          products: res.data.data
        })
      }
    }
    componentDidMount() {
      const params = this.props.params
      const path = this.props.path
    //   this.getItemsTypeList()
      if (params !== undefined && path !== undefined && path.includes("filter/price")){
          this.getFilter(params.from, params.to)
      }
      else if (params !== undefined && path !== undefined && path.includes("filter/price")){
          this.getItemsListByType(params.id)
      }
      else {
          this.getList()
      }
    }

  render() {
      
      console.log ("asc")
    return (
        <div>
            <Filter getFilter = {this.getFilter.bind(this)} getItemsListByType={this.getItemsListByType.bind(this)} />
            <List list = {this.state.products}/>
            {/* <Pagination /> */}
        </div>
    )
  }
}