import React, {useState} from 'react'
import Menu from '../svg/bars-solid.svg'
import Close from '../svg/times-solid.svg'
//import Cart from '../svg/cart.svg'
import {Link} from 'react-router-dom'
//import {DataContext} from '../Products/DataProvider'

export default function Header() {

    const [menu, setMenu] = useState(false)
   // const value = useContext(DataContext)
    //const [cart] = value.cart

    const toggleMenu = () =>{
        setMenu(!menu)
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <div className="header">
            <div className="menu" onClick={toggleMenu}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1><Link to="/home" >HMS</Link></h1>
            </div>
          
            <ul style={styleMenu}>
                <li  >
                
                    <input  className="inputSearch"  type="text" placeholder="Search" />
                    
                </li>
                <li><Link to="/home">Trang chủ</Link></li>
                <li><Link to="/products">Sản phẩm</Link></li>
                <li><Link to="/signup">Đăng nhập/ Đăng ký</Link></li>
                <li><Link to="/profile">Người dùng</Link></li>
                <li onClick={toggleMenu}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
            </ul>
            {/* <div className="cart-icon"> */}
                {/* <span>{cart.length}</span> */}
                {/* <Link to="/cart"> */}
                    {/* <img src={Cart} alt="" width="30" /> */}
                {/* </Link> */}
            {/* </div> */}
            
      </div>
    )
}
