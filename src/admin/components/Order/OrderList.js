import * as React from "react";
import { Card, CardContent, CardHeader, Chip, makeStyles } from '@material-ui/core';
import {
    List,
    Filter,
    Datagrid,
    NumberField,
    TextField,
    DateField,
    EditButton,
    TextInput,
    ChipField,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    ImageField,
    ReferenceManyField,
    SingleField,
    useVersion, useDataProvider
} from 'react-admin';
import {
    useState,
    useEffect,
    useCallback,
} from 'react';
import classnames from 'classnames';
import SpringDataProvider from "../../utils/SpringDataProvider";
import { FaBlackberry } from "react-icons/fa";


const dashboardProvider = SpringDataProvider("http://localhost:8081");



const useStyles = makeStyles(theme => ({
    color: {
    backgroundColor: 'black'}
}))

const ColoredChipField = props => {
    const classes = useStyles();

    let style = {color: 'white', backgroundColor: 'red'};
    const type = props.record.maTrangThai;
    if(type === 1){
        style = {
            color: 'black',
            backgroundColor: 'yellow'
        }
    }else if (type === 2){
        style = {
            color: 'black',
            backgroundColor: '#74fd74'
        }
    }

    return (
        <ChipField
            className={classes.color}
            style={style}
            {...props}
        />
    );
};

const Title = ({ record }) => {
    return <span>Danh sách Đơn hàng</span>;
  };

export const OrderList = props => {
    return (
        <List {...props} title={<Title />}>
            <Datagrid rowClick="edit">
                <NumberField source="maDonHang" label="Mã đơn hàng" />
                <DateField source="createdAt" label="Ngày đặt hàng" />
                <ReferenceField source="maNguoiDung" reference="nguoi-dung" label="Mã người dùng" >
                    <ChipField source="hoTen" />
                </ReferenceField>
                <NumberField source="giaTongCong" label="Giá tổng cộng" />
                <TextField source="SDTGiaoHang" label="Số điện thoại giao hàng" />
                <TextField source="tenNguoiNhanHang" label="Tên người nhận hàng" />
                <ReferenceField source="maTrangThai" reference="trang-thai-don-hang" label="Trạng thái đơn hàng">
                    <ColoredChipField source="tenTrangThai" />
                </ReferenceField>
            </Datagrid>
        </List>)
        ;
}