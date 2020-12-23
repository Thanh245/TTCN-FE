import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    NumberInput,
    required,
    DateInput
} from "react-admin";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import BackButton from "../BackButton/BackButton";
import { InputAdornment } from "@material-ui/core";

const CategoryTitle = ({ record }) => {
    return <span>Loại mặt hàng {record ? `${record.tenLoaiMatHang}` : ""}</span>;
};

export const CategoryEdit = (props) => {
    return (
    <Card>
        <CardContent>
            <BackButton />
            <Edit {...props} title={<CategoryTitle/>}>
                <SimpleForm>
                    <DateInput source="createdAt" label="Ngày tạo" />
                    <NumberInput source="updatedBy" label="Cập nhật bởi"/>
                    <NumberInput source="createdBy" label="Tạo bởi"/>
                    <NumberInput source="maLoaiMatHang" label="Mã loại mặt hàng" />
                    <TextInput source="tenLoaiMatHang" label="Tên loại mặt hàng"/>
                </SimpleForm>
            </Edit>
        </CardContent>
    </Card>
);
}