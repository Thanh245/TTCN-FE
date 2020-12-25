import React, { Component } from 'react'
import { Redirect  } from 'react-router-dom'
import "./profile.css"
import DatePicker  from 'react-datepicker' 
import 'react-datepicker/dist/react-datepicker.css'
import isEmpty from "validator/lib/isEmpty"
import validator from "validator"
import config from "../../config/config";
import {fetchUserProfileData} from "../../services/UserService"
export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state=({
            userInfor:{
                anhDaiDien:"https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
                gioiTinh:3,
                ngaySinh: "1999-11-20",
                hoTen:"",
                thanhPho: "",
                sdt:"",
            },
            validationMsg:{},
            role:""
        })
        if(JSON.parse(localStorage.getItem("user")===null))
        {
            const user = {
                token:"",
                id:0,
                tenDangNhap:"",
                role: "ROLE_GUEST",
                tokenType:""
            }
            localStorage.setItem("user",JSON.stringify(user))
        }
    } 
    
    componentDidMount(){
        const maNguoiDung = JSON.parse(localStorage.getItem("user")).id
        config()
        fetchUserProfileData(maNguoiDung).then((data) => {
        const userInfor ={
            anhDaiDien:data.data.anhDaiDien,
            gioiTinh:data.data.gioiTinh,
            ngaySinh: data.data.ngaySinh,
            hoTen:data.data.hoTen,
            thanhPho: data.data.thanhPho,
            sdt:data.data.sdt,
        }
        if(userInfor.anhDaiDien===null){
            userInfor.anhDaiDien = "https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
        }
        this.setState({userInfor:userInfor})
        }).catch((err) => {
            alert("thất bại")
        })
    }
    imageHandler = (e) =>{
        const reader = new FileReader();
        reader.onload =() =>{
            if(reader.readyState===2){
                this.setState({
                    anhDaiDien: reader.result
                })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    onChangeGender = (e) => {
        this.setState({ gioiTinh: e.target.id});
      };

    saveChange = (e) =>{
        e.preventDefault()
        const msg ={};
        const {hoTen,sdt}= this.state;
        if(isEmpty(hoTen)){
           msg.hoTen = "Please input your name";
        }
        if(!validator.isMobilePhone(sdt,"vi-VN")&&(sdt!=="")){
            msg.sdt ="Phone is not valid";
        }
        this.setState({
            validationMsg:msg,
        });
        if(Object.keys(msg).length>0) return;
        alert("successfully");
    }
    onChangeName = (e) =>
    {
        this.setState({hoTen:e.target.value});
    }
    onChangeCity = (e) => {
        this.setState({thanhPho:e.target.value})
    } 
    onChangePhone = (e) =>{
        this.setState({sdt:e.target.value})
    }
    onclickLogout = () => {
        localStorage.removeItem("user");
        const user = {
            token:"",
            id:0,
            tenDangNhap:"",
            role: "ROLE_GUEST",
            tokenType:""
        }
        localStorage.setItem("user",JSON.stringify(user))
        this.setState({
            thanhPho:""
        })
    }

    render() {
        var birthday = new Date(this.state.userInfor.ngaySinh)
        const role = JSON.parse(localStorage.getItem("user")).role
        if (role==="ROLE_GUEST")
        return <Redirect to='/signup'  />
        return(
            <div>
              <h1>Thông tin người dùng</h1>
              <button className="btn_logout" onClick={this.onclickLogout}> Đăng xuất</button>
              <div className="contain_profile">
                    <div className="choose_new_avatar">
                        <label> Ảnh đại diện: </label>
                        <input type="file" accept="image/*" onChange={this.imageHandler}></input>
                        <img src={this.state.userInfor.anhDaiDien} alt="this is avatar" className="avatar_image"></img>
                    </div>
                    <hr/>
                    <div className="your_name">
                        <label> Họ Và Tên: </label>
                        <input className="your_name" type="text" defaultValue={this.state.userInfor.hoTen} onChange={this.onChangeName}></input>
                        <p className="warning">{this.state.validationMsg.hoTen}</p>
                    </div>
                    <hr/>
                    <div className="gender">
                    <label> Giới Tính: </label>
                    <input type="radio"  name="gender" id={1} defaultChecked={this.state.userInfor.gioiTinh === 1} onClick={this.onChangeGender}/>
                    <label htmlFor={1} className="gender">Nam</label> 
                    <input type="radio"  name="gender" id={2} defaultChecked={this.state.userInfor.gioiTinh === 2} onClick={this.onChangeGender}/>
                    <label htmlFor={2} className="gender" >Nữ</label>
                    <input type="radio" name="gender" id={3} defaultChecked={this.state.userInfor.gioiTinh === 3} onClick={this.onChangeGender}/>
                    <label htmlFor={3} className="gender" >Khác</label>
                    </div>
                    <hr/>
                    <div className="address">
                        <label htmlFor="address"> Thành Phố:  </label>
                        <input type="text" id="address" className="address" defaultValue={this.state.userInfor.thanhPho} onChange={this.onChangeCity}></input>
                    </div>
                    <hr/>
                    <div className="birthday">
                    <label> Ngày Sinh: </label>
                    <DatePicker dateFormat="yyyy-MM-dd" selected={birthday} onChange={date => this.setState({ngaySinh:date})}/>
                    </div>
                    <hr/>
                    <div className="about">
                        <label> SDT: </label>
                        <input type="text" className="about"  defaultValue={this.state.userInfor.sdt} onChange={this.onChangePhone}></input>
                        <p className="warning">{this.state.validationMsg.sdt}</p>
                    </div>
                    <hr/>
                        <button className="button_save" onClick={this.saveChange} >Lưu</button>
              </div>
            </div>    
          )
    }
}
