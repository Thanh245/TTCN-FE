import * as React from "react";
import { FC } from 'react';
import { Box, Chip, useMediaQuery, Theme, Avatar, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    List,
    Filter,
    Datagrid,
    NumberField,
    TextField
} from 'react-admin';
const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const Title = ({ record }) => {
    return <span>Danh sách Người Dùng</span>;
  };
  

export const CustomerList = props => {
    var imageName = require('./test.jpg')
    return (
        <Card style={{width:1000}}>
            <List {...props} bulkActionButtons={false} title={<Title />}>
                <Datagrid rowClick="edit">
                    <NumberField source="maNguoiDung" label="Mã người dùng" />
                    <TextField source="hoTen" label="Họ và tên" />
                    <TextField source="sdt" label="Số điện thoại" />
                    <TextField source="thanhPho" label="Thành phố" />
                    <TextField source="maTaiKhoan" label="Mã Tài Khoản" />

                </Datagrid>
            </List>
        </Card>

    );
}