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
  ReferenceInput,
  SelectInput,
  ImageField,
  ReferenceManyField,
  SingleField,
  Toolbar,
  SaveButton,
  DeleteButton
} from 'react-admin';
const useStyles = makeStyles({
  toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
  },
});

const CustomToolbar = props => (
  <Toolbar {...props} classes={useStyles()}>
      <SaveButton undoable={false} />
      <DeleteButton undoable={false} />
  </Toolbar>
);
const useQuickFilterStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
  },
}));

const ProductFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="Loại mặt hàng" source="maLoaiMatHang" reference="loai-mat-hang" alwaysOn>
            <SelectInput optionText="tenLoaiMatHang" />
    </ReferenceInput>
  </Filter>
);

const Title = ({ record }) => {
  return <span>Danh sách Mặt hàng</span>;
};
const pictures = [
  { url: 'product.jpeg', desc: 'First image' }
];
export const ProductList = (props) => (
    <List filters={<ProductFilter />} title={<Title />} {...props}>
      <Datagrid rowClick="edit">
        <NumberField source="maMatHang" label="Mã mặt hàng" />
        <TextField source="tenMatHang" label="Tên mặt hàng" />
        <ReferenceField source="maLoaiMatHang" reference="loai-mat-hang" label="Loại mặt hàng" >
            <ChipField source="tenLoaiMatHang" />
        </ReferenceField>
        <NumberField source="gia" label="Giá" />
        <TextField source="moTa" label="Mô tả" />
        <NumberField source="soLuong" label="Số lượng" />
        <NumberField source="soLuongDaBan" label="Số lượng đã bán" />
        <EditButton label="Chỉnh sửa" />
      </Datagrid>
    </List>
);
