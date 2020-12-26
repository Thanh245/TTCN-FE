import * as React from "react";
import { Card, CardContent, CardHeader, Chip, makeStyles } from '@material-ui/core';
import {
    List,
    Filter,
    Datagrid,
    NumberField,
    TextField,
    DateField,
    EditButton,
    TextInput,
    ChipField,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    ImageField,
    ReferenceManyField,
    SingleField
  } from 'react-admin';
  import classnames from 'classnames';


  
const useStyles = makeStyles({
    pending: { backgroundColor: '#a8a832' },
    accepted: { backgroundColor: '#42a832' },
    cancelled: { backgroundColor: '#a84432' }
});

const ColoredChipField = props => {
    const classes = useStyles();

    const isPending = status => status === "Accepted";

    return (
        <ChipField
            className={classnames({
                [classes.accepted]: isPending(props.record[props.source]),
            
            })}
            {...props}
        />
    );
};

export const OrderList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <NumberField source="maDonHang" label="Mã đơn hàng"/>
            <DateField source="createdAt" label="Ngày đặt hàng"/>
            <ReferenceField source="createdBy" label="Người mua">
                <TextField source="hoTen" />
            </ReferenceField>


            <NumberField source="giaTongCong" label="Giá tổng cộng"/>
            <TextField source="SDTGiaoHang" label="Số điện thoại giao hàng"/>
            <TextField source="tenNguoiNhanHang" label="Tên người nhận hàng" />
            <ReferenceField source="maTrangThaiDonHang" reference="trang-thai-don-hang" label="Trạng thái đơn hàng">
                <ChipField source="tenTrangThai" />
            </ReferenceField>
        </Datagrid>
    </List>
);