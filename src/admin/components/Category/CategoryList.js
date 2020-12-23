import * as React from "react";

import { FC } from 'react';
import { Box, Chip, useMediaQuery, Theme } from '@material-ui/core';
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
  ImageField,
  ReferenceManyField,
  SingleField
} from 'react-admin';


const CategoryFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />

  </Filter>
);

const Title = ({ record }) => {
  return <span>Danh sách Loại mặt hàng</span>;
};
const pictures = [
  { url: 'product.jpeg', desc: 'First image' }
];
var imageName = require('./test.jpg')

export const CategoryList = props => (
    <List title={<Title />} {...props}>
        <Datagrid rowClick="edit">
          
            <TextField source="maLoaiMatHang" label = "Mã loại mặt hàng"/>
            <img src={imageName} width="100" label = "Ảnh loại mặt hàng"/>

            <TextField source="tenLoaiMatHang" label = "Tên loại mặt hàng" />
        </Datagrid>
    </List>
);