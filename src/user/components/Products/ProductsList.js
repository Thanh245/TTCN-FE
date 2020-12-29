import React from "react";
import Filter from './Filter/Filter'
import List from './List/List';
import Pagination from './Pagination/Pagination'
import {  fetchItemsList, fetchItemsListFilter,fetchItemsListByType } from "../../services/ItemService";
import history from "../../../history";

export default class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            totalPages: 0
            // cart: [],
            // search: "",
            // to: 0,
            // from: 0,
            // loaiMatHangList: [],
          };
      }

    getParams() {
        const params = this.props.match.params
        let pageable = ""
        let check = false
        if (params !== undefined){
            if (params.page !== undefined) {
                pageable.concat(`page=${params.page}`)
                check = true
            } else if (params.size !== undefined) {
                if (check) pageable.concat(`&size=${params.size}`)
                else {
                    pageable.concat(`size=${params.size}`)
                    check = true
                }
            } else if (params.tenMatHang !== undefined) {
                if (check) pageable.concat(`&tenMatHang=${params.tenMatHang}`)
                else {
                    pageable.concat(`tenMatHang=${params.tenMatHang}`)
                    check = true
                }
            } else if (params.maLoaiMatHang !== undefined) {
                if (check) pageable.concat(`&maLoaiMatHang=${params.maLoaiMatHang}`)
                else {
                    pageable.concat(`maLoaiMatHang=${params.maLoaiMatHang}`)
                    check = true
                }
            } else if (params.giaBatDau !== undefined) {
                if (check) pageable.concat(`&giaBatDau=${params.giaBatDau}`)
                else {
                    pageable.concat(`giaBatDau=${params.giaBatDau}`)
                    check = true
                }
            } else if (params.giaKetThuc !== undefined) {
                if (check) pageable.concat(`&giaKetThuc=${params.giaKetThuc}`)
                else {
                    pageable.concat(`giaKetThuc=${params.giaKetThuc}`)
                    check = true
                }
            } else if (params.sortType !== undefined) {
                if (check) pageable.concat(`&sortType=${params.sortType}`)
                else {
                    pageable.concat(`sortType=${params.sortType}`)
                    check = true
                }
            } else if (params.sort !== undefined) {
                if (check) pageable.concat(`&sort=${params.sort}`)
                else {
                    pageable.concat(`sort=${params.sort}`)
                    check = true
                }
            }
        } 
        return pageable
    }
    

    getList = async() => {
        // const params = this.props.match.params
        // if (params !== undefined) {}
        const res = await fetchItemsList(0);
        if (res.status === 200) {
            this.setState({
              ...this.state,
              totalPages: res.data.totalPages,
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
            totalPages: res.data.totalPages,
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
            totalPages: res.data.totalPages,
            loading: false
          })
      }
    }

    getItemsListByType = async(id) => {
      history.push(`/productslist/filter/type/${id}`)
      const res = await fetchItemsListByType(id, 0);
      if (res.status === 200) {
        this.setState({
            ...this.state,
            totalPages: res.data.totalPages,
            products: res.data.data
        })
      }
    }

    componentDidMount() {
      const params = this.props.match.params
      const path = this.props.match.path
    //   this.getItemsTypeList()
    // alert( this.props.match)
      if (this.props.match !== undefined) {
        const pageNum = this.props.match.page  
        if (params !== undefined && path !== undefined && path.includes("filter/price")){
            this.getFilter(params.from, params.to, this.getParams())
        }
        else if (params !== undefined && path !== undefined && path.includes("filter/price")){
            this.getItemsListByType(params.id, pageNum !== undefined ? pageNum : 0)
        }
        else {
            this.getList(pageNum !== undefined ? pageNum : 0)
        }
      }
    }

    navPage (numPage){
        const params = this.props.params
        const path = this.props.path
        if (params !== undefined && path !== undefined && path.includes("filter/price")){
            this.getFilter(params.from, params.to, numPage)
        }
        else if (params !== undefined && path !== undefined && path.includes("filter/price")){
            this.getItemsListByType(params.id, numPage)
        }
        else {
            this.getList(numPage)
        }
    }
  render() {
    return (
        <div>
            <Filter getFilter = {this.getFilter.bind(this)} getItemsListByType={this.getItemsListByType.bind(this)} />
            <List list = {this.state.products}/>
            <Pagination totalPages={this.state.totalPages} onNavPage = {this.navPage.bind(this)} />
        </div>
    )
  }
}