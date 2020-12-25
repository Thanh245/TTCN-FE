import React from "react";
import {fetchItemsTypeList} from "../../services/ItemService"

class DropList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loaiMatHang: []
        }
      }

    getItemsTypeList = async() => {

        const res = await fetchItemsTypeList();
        if (res.status === 200) {
          this.setState({
            loaiMatHang: res.data.data
          })
      }
    }

    componentDidMount (){
        this.getItemsTypeList()
    }
    
    

    render (){
        return(
            <div>
                <select> 
                   {this.state.loaiMatHang.map((ItemType) => {return <option> {ItemType.tenLoaiMatHang} </option>})}
                </select>
            </div>
        )
       
       
       
       
    }
    
}

export default DropList;