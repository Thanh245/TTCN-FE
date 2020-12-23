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


export const CategoryCreate = (props) => {
    return(
        <Card>
            <CardContent>
                <BackButton/>
                <Create {...props}>
                    <SimpleForm>
                        <TextInput source="tenLoaiMatHang" validate={required()} />
                    </SimpleForm>
                </Create>
            </CardContent>
        </Card>
    );

};