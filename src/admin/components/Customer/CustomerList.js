import * as React from "react";
import { FC } from 'react';
import { Box, Chip, useMediaQuery, Theme, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  Filter,
  Datagrid,
  NumberField,
  TextField,
  EditButton,
  TextInput,
  ChipField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  ImageField,
  ReferenceManyField,
  SingleField,
  Toolbar,
  SaveButton,
  DateField,
  BooleanField,
  DeleteButton
} from 'react-admin';
const useStyles = makeStyles({
  toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
  },
});

export const CustomerList = props => {
    var imageName = require('./test.jpg')

    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <NumberField source="maNguoiDung" label="Mã người dùng"/>
                <Avatar alt="Remy Sharp" src={imageName} label="Ảnh người dùng"/>

                <TextField source="hoTen" label = "Họ và tên" />
                <TextField source="gioiTinh" label = "Giới tính"/>
                <TextField source="sdt" label="Số điện thoại" />
                <TextField source="thanhPho" label="Thành phố"/>
            </Datagrid>
        </List>
    );
}