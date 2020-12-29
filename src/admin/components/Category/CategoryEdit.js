import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    DateInput,
    useRedirect,
    useRefresh,
    Toolbar,
    SaveButton,
    DeleteButton
} from "react-admin";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import BackButton from "../BackButton/BackButton";
import { makeStyles } from '@material-ui/core/styles';

const CategoryTitle = ({ record }) => {
    return <span>Loại mặt hàng {record ? `${record.tenLoaiMatHang}` : ""}</span>;
};

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
  
export const CategoryEdit = (props) => {
    const redirect = useRedirect();
  const refresh = useRefresh();

  const onSuccess = ({ data }) => {
    redirect('/loai-mat-hang');
    refresh();
};
    return (
    <Card>
        <CardContent>
            <BackButton />
            <Edit {...props} title={<CategoryTitle/>} onSuccess={onSuccess} undoable={false}>
                <SimpleForm toolbar={<CustomToolbar />}>
                    <DateInput source="createdAt" label="Ngày tạo" disabled/>
                    <NumberInput source="maLoaiMatHang" label="Mã loại mặt hàng" disabled/>
                    <TextInput source="tenLoaiMatHang" label="Tên loại mặt hàng"/>
                </SimpleForm>
            </Edit>
        </CardContent>
    </Card>
);
}