import * as React from "react";

import {  Card, makeStyles} from '@material-ui/core';
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
  ImageField
} from 'react-admin';




const ProductFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="Loại mặt hàng" source="maLoaiMatHang" reference="loai-mat-hang" alwaysOn>
      <SelectInput optionText="tenLoaiMatHang" />
    </ReferenceInput>
  </Filter>
);

const useImageFieldStyles = makeStyles(theme => ({
  image: { // This will override the style of the <img> inside the <div>
      height: 70,
  }
}));


const Title = ({ record }) => {
  return <span>Danh sách Mặt hàng</span>;
};

const styles = {
  image: { maxHeight: '3rem' }
}
export const ProductList = (props) => {
  const imageFieldClasses = useImageFieldStyles();
  return (
    <Card>
      <List filters={<ProductFilter />} title={<Title />} {...props}>
        <Datagrid rowClick="edit">
          <NumberField source="maMatHang" label="Mã mặt hàng" />
          <ImageField classes={imageFieldClasses} source="danhSachHinhAnhNew[0].anh" label="Ảnh mặt hàng" />
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