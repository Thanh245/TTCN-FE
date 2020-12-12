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
  return <span>Post {record ? `"${record.tenMatHang}"` : ""}</span>;
};

export const ProductEdit = (props) => {
  return (
    <Card>
      <CardActions>
        <BackButton />
      </CardActions>
      <CardContent>
        <Edit title={<ProductTitle />} {...props}>
          <SimpleForm>
            <TextInput  source="maMatHang" />
            {/*<ReferenceInput source="ma_loai_mat_hang" reference="loaimathang">
              <SelectInput optionText="ten_loai_mat_hang" />
  </ReferenceInput>*/}
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
        </Edit>
      </CardContent>
    </Card>
  );
};
