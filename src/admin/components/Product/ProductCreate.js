import * as React from "react";
import {
  required,
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  useRedirect,
  useRefresh
} from "react-admin";
import BackButton from "../BackButton/BackButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { InputAdornment } from "@material-ui/core";

const transform = data => ({
  "tenMatHang": `${data.tenMatHang}`,
  "loaiMatHang": { "maLoaiMatHang": data.maLoaiMatHang},
  "gia": data.gia,
  "soLuong": data.soLuong,
  "soLuongDaBan": data.soLuongDaBan,
  "moTa": `${data.moTa}`
});

export const ProductCreate = (props) => {
  const redirect = useRedirect();
  const refresh = useRefresh();

  const onSuccess = ({ data }) => {
    redirect('/mat-hang');
    refresh();
};

  return (
    <Card>
      <CardContent>
        <BackButton />
        <Create {...props} transform={transform} onSuccess={onSuccess}>
          <SimpleForm>
            <TextInput disabled source="maMatHang" />
            <ReferenceInput source="maLoaiMatHang" reference="loai-mat-hang" label="Loại mặt hàng">
              <SelectInput optionText="tenLoaiMatHang"/>
            </ReferenceInput>
            <TextInput source="tenMatHang" />
            <TextInput multiline source="moTa" />
            <NumberInput source="soLuong" validate={required()} />
            <NumberInput source="soLuongDaBan" validate={required()} />
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
        </Create>
      </CardContent>
    </Card>
  );
};
