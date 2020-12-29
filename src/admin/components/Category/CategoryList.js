import * as React from "react";

import { FC } from 'react';
import { Box, Chip, useMediaQuery, Theme, CardContent } from '@material-ui/core';
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
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";

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
  <Card style={{width:1000}}>
    <CardContent>
    <List title={<Title />} {...props}>
        <Datagrid rowClick="edit">          
            <TextField source="maLoaiMatHang" label = "Mã loại mặt hàng" style={{width:1}}/>
            <img src={imageName} width="100" label = "Ảnh loại mặt hàng"/>
            <TextField source="tenLoaiMatHang" label = "Tên loại mặt hàng" />
        </Datagrid>
    </List>
    </CardContent>
  </Card>
    
);