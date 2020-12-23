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


export const CategoryCreate = (props) => {
    const redirect = useRedirect();
  const refresh = useRefresh();

  const onSuccess = ({ data }) => {
    redirect('/loai-mat-hang');
    refresh();
};
    return(
        <Card>
            <CardContent>
                <BackButton/>
                <Create {...props} onSuccess={onSuccess}>
                    <SimpleForm>
                        <TextInput source="tenLoaiMatHang" validate={required()} />
                    </SimpleForm>
                </Create>
            </CardContent>
        </Card>
    );

};