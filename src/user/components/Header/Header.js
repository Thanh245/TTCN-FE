import React from 'react'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import Cart from '../svg/cart.svg'
import './Header.css'
import {isLoggedIn, logout} from '../../services/AuthenticationService'
import { Link } from 'react-router-dom'
import { Route, Router } from 'react-router'
import ProductsList from '../Products/List/List'

class Header extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: this.props.isLoggedIn
        }
    }

    onLogout() {
        logout()
        this.setState({
            ...this.state,
            isLoggedIn: isLoggedIn()
        })
    }
    getNav() {
        if (!isLoggedIn()) return (<Nav.Link href="/signup">Đăng nhập/ Đăng ký</Nav.Link>)
        else return (<NavDropdown title="Người dùng" id="basic-nav-dropdown">
                        <NavDropdown.Item><Link to='profile'>Thông tin cá nhân</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to='purchase'>Đơn hàng</Link></NavDropdown.Item>
                        <NavDropdown.Item onClick={this.onLogout.bind(this)}>Đăng xuất</NavDropdown.Item>
                    </NavDropdown>)
    }

    render(){
        return(
            <div className="header">
            <div className="row">
                <div className="col-md-12">
                    <Router>
                    <Navbar  expand="lg" sticky="top">
                        <Navbar.Brand  href='/'>
                            <img src= {process.env.PUBLIC_URL + "/logo/logo.png"} alt='..'/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                {/* <Form inline>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                />
                                <Button variant="outline-success">Search</Button>
                                </Form> */}
                                <fomr>
                                    <input className="inputSearch" type="text" placeholder="  Tìm kiếm..." />
                                    <input className="btnSearch" type = "button" value="Tìm kiếm"/>
                                </fomr>
                            </Nav>
                            <Nav className="header-item">
                                <Nav.Link><Link to='/'>Trang chủ</Link></Nav.Link>
                                <Nav.Link ><Link to='/productslist'>Sản phẩm</Link></Nav.Link>
                                <Nav.Link ><Link to='/cart'>Giỏ hàng <img src={Cart} alt="" width="20" /></Link></Nav.Link>
                                {this.getNav()}
                            </Nav>
                            <Route exact path='/' Component={ProductsList}></Route>
                        </Navbar.Collapse>
                    </Navbar>
                    </Router>
                </div>
            </div>
            </div>
        )  
    }
}

export default Header;