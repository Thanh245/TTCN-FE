import React, {useState} from 'react'
import Menu from '../svg/bars-solid.svg'
import Close from '../svg/times-solid.svg'
import Cart from '../svg/cart.svg'
import {Link} from 'react-router-dom'
import './Header.css'


export class Header extends React.Component {

    state = {
      toggle: false
    };
  
    menuToggle = () => {
      this.setState({ toggle: !this.state.toggle });
    };
  
    render() {
      const { toggle } = this.state;
      return (
        <header>
          <div className="menu" onClick={this.menuToggle}>
            <img src={Menu} alt="" width="20" />
          </div>
          <div className="logo">
            <h1>
              <Link to="/" onClick={this.props.onHomePageBtn}><img src= {process.env.PUBLIC_URL + "/logo/logo.png"} alt='..'/></Link>
            </h1>
          </div>
          <nav>
            <ul className={toggle ? "toggle" : ""}>
                  <li><Link to="/" onClick={this.props.onHomePageBtn}>Trang chủ</Link></li>
                  <li><Link to="/productslist">Sản phẩm</Link></li>
                  <li><Link to="/signup">Đăng nhập/ Đăng ký</Link></li>
                  <li><Link to="/profile">Người dùng</Link></li>
                  
              <li className="close" onClick={this.menuToggle}>
                <img src={Close} alt="" width="20" />
              </li>
            </ul>
            <div className="nav-cart">
              {/* <span>{cart.length}</span> */}
              <Link to="/cart">
                <img src={Cart} alt="" width="20" />
              </Link>
            </div>
          </nav>
        </header>
      );
    }
  }
  
  export default Header;
  