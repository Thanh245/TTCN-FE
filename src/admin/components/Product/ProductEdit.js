import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  required
} from "react-admin";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import BackButton from "../BackButton/BackButton";
import { InputAdornment } from "@material-ui/core";

const ProductTitle = ({ record }) => {
  return <span>Mặt hàng {record ? `${record.tenMatHang}` : ""}</span>;
};
const transform = data => ({
  "maMatHang": data.maMatHang,
  "tenMatHang": `${data.tenMatHang}`,
  "loaiMatHang": { "maLoaiMatHang": data.maLoaiMatHang},
  "gia": data.gia,
  "soLuong": data.soLuong,
  "soLuongDaBan": data.soLuongDaBan,
  "moTa": `${data.moTa}`,
  "rate": data.rate,
  "soLuotDanhGia": data.soLuotDanhGia
});
export const ProductEdit = (props) => {
  
  return (
    <Card>
      <CardContent>
        <BackButton />
        <Edit title={<ProductTitle />} transform={transform} {...props} undoable={false}>
          <SimpleForm>
            <TextInput source="maMatHang" />
            <ReferenceInput source="maLoaiMatHang" reference="loai-mat-hang" label="Loại mặt hàng">
              <SelectInput optionText="tenLoaiMatHang" />
            </ReferenceInput>
            <TextInput source="tenMatHang" />
            <TextInput multiline source="moTa" />
            <NumberInput source="soLuong" validate={required()} />
            <NumberInput source="soLuongDaBan" validate={required()} />
            <NumberInput source="rate" validate={required()} />
            <NumberInput source="soLuotDanhGia" validate={required()} />
            <NumberInput
              source="gia"
              validate={required()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                )
              }}
            />
          </SimpleForm>
        </Edit>
      </CardContent>
    </Card>
  );
};
