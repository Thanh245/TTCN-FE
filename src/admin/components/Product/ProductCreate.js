import * as React from "react";
import {
  required,
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput
} from "react-admin";
import BackButton from "../BackButton/BackButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { InputAdornment } from "@material-ui/core";

export const ProductCreate = (props) => {
  return (
    <Card>
      <CardActions>
        <BackButton />
      </CardActions>
      <CardContent>
        <Create {...props}>
          <SimpleForm>
            <TextInput disabled source="maMatHang" />
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
        </Create>
      </CardContent>
    </Card>
  );
};
