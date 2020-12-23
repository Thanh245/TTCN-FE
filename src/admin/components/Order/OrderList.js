import * as React from "react";
import { Card, CardContent, CardHeader, Chip } from '@material-ui/core';
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

export const OrderList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <NumberField source="maDonHang" label="Mã đơn hàng"/>
            <DateField source="createdAt" label="Ngày đặt hàng"/>
            <NumberField source="createdBy" label="Người mua"/>
            <NumberField source="giaTongCong" label="Giá tổng cộng"/>
            <TextField source="SDTGiaoHang" label="Số điện thoại giao hàng"/>
            <TextField source="tenNguoiNhanHang" label="Tên người nhận hàng" />
            <NumberField source="maTrangThaiDonHang" />
            <ReferenceField source="maTrangThaiDonHang" reference="trang-thai-don-hang" label="Trạng thái đơn hàng">
                <ChipField source="tenTrangThai" />
            </ReferenceField>
        </Datagrid>
    </List>
);