import React from "react";
import {NavLink, Route} from "react-router-dom"
import ProductsList from "./ProductsList";
import {useHistory, useLocation} from "react-router-dom"
function PriceButton(props){
    // constructor(props) {
        // super(props);
    // }
    // 
    const history = useHistory()
    function handle(path) {
        // alert(path)
        // history.pop()
        // history.goBack()
        // history.push(path)
        // history.
    }

    // render (){
        const from = props.from
        const to = props.to
        // alert (from )
        // alert (to)
        if  (from !== undefined && to !== undefined) 
        return(
            // <Route path = {`/productslist/filter/price/${from}/${to}`} component={ProductsList} >
            // {/* Từ {this.props.from/1000000} triệu tới {this.props.to/1000000}  */}
            // {/* </Route> */}
            <button className = "gia"  onClick= {() => {
                // alert("asd")
                props.handleClick(from, to)
                }
            }> Từ {props.from/1000000} triệu tới {props.to/1000000} </button>
        )
        else if (from !== undefined)
        return(
            // <div></div>
            <button className = "gia"  onClick= {() => {
                // alert("asd")
                props.handleClick(from, 9999999999)
                }
             }> Trên {props.from/1000000} triệu  </button>
        )
        else 
        return(
            // <div></div>
            <button className = "gia"  onClick= {() => {
                // alert("asd")
                props.handleClick(0, to)    
                }
            }> Dưới {props.to/1000000} triệu  </button>
        )
    }
    
// }

export default PriceButton;