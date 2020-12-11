import * as React from "react";
import {
  Filter,
  TextInput,
  ReferenceInput,
  SelectInput,
  EditButton,
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField
} from "react-admin";

const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const ProductList = (props) => (
  <List filters={<ProductFilter />} {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="maMatHang" />
      <TextField source="tenMatHang" />
      {/* <ReferenceField source="ma_loai_mat_hang" reference="loaimathang">
        <TextField source="ten_loai_mat_hang" />
      </ReferenceField> */}
      <TextField source="loaiMatHang.tenLoaiMatHang" />
      <NumberField source="gia" />
      <TextField source="moTa" />
      <NumberField source="soLuong" />
      <NumberField source="soLuongDaBan" />
      <EditButton />
    </Datagrid>
  </List>
);
