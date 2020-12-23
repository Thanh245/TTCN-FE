import React, { Component } from 'react'
import { Redirect  } from 'react-router-dom'
import DatePicker  from 'react-datepicker' 
import 'react-datepicker/dist/react-datepicker.css'
import isEmpty from "validator/lib/isEmpty"
import validator from "validator"
import profile from "../../../profile.json"

export default class Profile extends Component {
    
    
    constructor(props){
        super(props)
        this.state=({
            anhDaiDien:"",
            gioiTinh:3,
            ngaySinh: "1999-11-20",
            hoTen:"",
            thanhPho: "",
            sdt:"",
            validationMsg:{},
            token:""
        })
    } 
    
    componentWillMount(){
        this.setState({
            anhDaiDien:profile[0].anhDaiDien,
            gioiTinh:profile[0].gioiTinh,
            ngaySinh: profile[0].ngaySinh,
            hoTen:profile[0].hoTen,
            thanhPho: profile[0].thanhPho,
            sdt:profile[0].sdt,
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
    onclickLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        this.setState({token:""})
    }

    render() {
        var birthday = new Date(this.state.ngaySinh)
        const token = localStorage.getItem("token")
        if (!token)
        return <Redirect to='/signup'  />
        return(
            <div>
              <h1>Thông tin người dùng</h1>
              <button className="btn_logout" onClick={this.onclickLogout}> Đăng xuất</button>
              <div className="contain_profile">
                    <div className="choose_new_avatar">
                        <label> Ảnh đại diện: </label>
                        <input type="file" accept="image/*" onChange={this.imageHandler}></input>
                        <img src={this.state.anhDaiDien} alt="this is avatar" className="avatar_image"></img>
                    </div>
                    <hr/>
                    <div className="your_name">
                        <label> Họ Và Tên: </label>
                        <input className="your_name" type="text" defaultValue={this.state.hoTen} onChange={this.onChangeName}></input>
                        <p className="warning">{this.state.validationMsg.hoTen}</p>
                    </div>
                    <hr/>
                    <div className="gender">
                    <label> Giới Tính: </label>
                    <input type="radio"  name="gender" id={1} defaultChecked={this.state.gioiTinh === 1} onClick={this.onChangeGender}/>
                    <label htmlFor={1} className="gender">Nam</label> 
                    <input type="radio"  name="gender" id={2} defaultChecked={this.state.gioiTinh === 2} onClick={this.onChangeGender}/>
                    <label htmlFor={2} className="gender" >Nữ</label>
                    <input type="radio" name="gender" id={3} defaultChecked={this.state.gioiTinh === 3} onClick={this.onChangeGender}/>
                    <label htmlFor={3} className="gender" >Khác</label>
                    </div>
                    <hr/>
                    <div className="address">
                        <label htmlFor="address"> Thành Phố:  </label>
                        <input type="text" id="address" className="address" defaultValue={this.state.thanhPho} onChange={this.onChangeCity}></input>
                    </div>
                    <hr/>
                    <div className="birthday">
                    <label> Ngày Sinh: </label>
                    <DatePicker dateFormat="yyyy-MM-dd" selected={birthday} onChange={date => this.setState({ngaySinh:date})}/>
                    </div>
                    <hr/>
                    <div className="about">
                        <label> SDT: </label>
                        <input type="text" className="about"  defaultValue={this.state.sdt} onChange={this.onChangePhone}></input>
                        <p className="warning">{this.state.validationMsg.sdt}</p>
                    </div>
                    <hr/>
                        <button className="button_save" onClick={this.saveChange} >Lưu</button>
              </div>
            </div>    
          )
    }
}
