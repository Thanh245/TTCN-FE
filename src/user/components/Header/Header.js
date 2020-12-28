import React from 'react'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import Cart from '../svg/cart.svg'
import './Header.css'
class Header extends React.Component{

    render(){
        return(
            <div >
            <div className="row">
                <div className="col-md-12">
                    <Navbar  expand="lg" sticky="top">
                        <Navbar.Brand href="/"  onClick={this.props.onHomePageBtn}>
                            <img src= {process.env.PUBLIC_URL + "/logo/logo.png"} alt='..'/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Form inline>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                />
                                <Button variant="outline-success">Search</Button>
                                </Form>
                            </Nav>
                            <Nav className="header">
                                <Nav.Link href="/">Trang chủ</Nav.Link>
                                <Nav.Link href="/productslist">Sản phẩm</Nav.Link>
                                <Nav.Link href="/signup">Đăng nhập/ Đăng ký</Nav.Link>
                                <NavDropdown title="Người dùng" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">Thông tin</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Đơn hàng</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Đăng xuất</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/cart"><img src={Cart} alt="" width="20" /></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
            </div>
        )  
    }
}

export default Header;