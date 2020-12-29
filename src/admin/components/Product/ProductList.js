import * as React from "react";

import { FC } from 'react';
import { Box, Chip, useMediaQuery, Theme, Card} from '@material-ui/core';
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




const ProductFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="Loại mặt hàng" source="maLoaiMatHang" reference="loai-mat-hang" alwaysOn>
      <SelectInput optionText="tenLoaiMatHang" />
    </ReferenceInput>
  </Filter>
);

const CustomTextField = ({ record }) => {
  let str = record.moTa;
  // "record" is a prop received from the Datagrid
  return record ? (
    <span>{str.length > 20 ? str.slice(0, 20) + "..." : str}</span>
  ) : null;
};

const Title = ({ record }) => {
  return <span>Danh sách Mặt hàng</span>;
};

export const ProductList = (props) => {
  return (
    <Card>
      <List filters={<ProductFilter />} title={<Title />} {...props}>
        <Datagrid rowClick="edit">
          <NumberField source="maMatHang" label="Mã mặt hàng" />
          <ImageField source="danhSachHinhAnhNew[0].anh" label="Ảnh mặt hàng" />
          <TextField source="tenMatHang" label="Tên mặt hàng" />
          <ReferenceField source="maLoaiMatHang" reference="loai-mat-hang" label="Loại mặt hàng" >
            <ChipField source="tenLoaiMatHang" />
          </ReferenceField>
          <NumberField source="gia" label="Giá" />
          {/*<CustomTextField label="Mô tả"/> */}
          <NumberField source="soLuong" label="Số lượng" />
          <NumberField source="soLuongDaBan" label="Số lượng đã bán" />
          <EditButton label="Chỉnh sửa" />
        </Datagrid>
      </List>

    </Card>

  );

} 