import * as React from "react";

import { CardContent } from '@material-ui/core';
import {
  List,
  Datagrid,  
  TextField
} from 'react-admin';
import Card from "@material-ui/core/Card";



const Title = ({ record }) => {
  return <span>Danh sách Loại mặt hàng</span>;
};


export const CategoryList = props => (
  <Card style={{width:1000}}>
    <CardContent>
    <List title={<Title />} {...props}>
        <Datagrid rowClick="edit">          
            <TextField source="maLoaiMatHang" label = "Mã loại mặt hàng" style={{width:1}}/>
            <TextField source="tenLoaiMatHang" label = "Tên loại mặt hàng" />
        </Datagrid>
    </List>
    </CardContent>
  </Card>
    
);