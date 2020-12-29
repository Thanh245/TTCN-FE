import * as React from "react";
import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import SpringDataProvider from "../../utils/SpringDataProvider";
import { Link } from 'react-router-dom';

import {
  TopToolbar,
  Toolbar,
  SaveButton,
  DeleteButton,
  NumberField,
  Edit,
  CloneButton,
  ShowButton,
  EditButton,
  FormTab,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceManyField,
  ReferenceInput,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  TextField,
  TextInput,
  minValue,
  number,
  required,
  FormDataConsumer,
  SimpleForm,
  ReferenceField,
  ChipField,
  RadioButtonGroupInput,
  useRedirect,
  useRefresh
} from "react-admin";
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import RichTextInput from 'ra-input-rich-text';

import { Card, CardContent, withStyles } from '@material-ui/core';
import CardActions from "@material-ui/core/CardActions";
import BackButton from "../BackButton/BackButton";
import { InputAdornment, ListItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
const dashboardProvider = SpringDataProvider("http://localhost:8081");

const EditActions = ({ basePath, data, hasShow }) => (
  <TopToolbar>
    <CloneButton
      className="button-clone"
      basePath={basePath}
      record={data}
    />
    {hasShow && <ShowButton basePath={basePath} record={data} />}
  </TopToolbar>
);

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

const OrderTitle = ({ record }) => {
  return <span>Đơn hàng {record ? `${record.maDonHang}` : ""}</span>;
};
const transform = data => ({
  "maTrangThai": data.trangThaiDonHang.maTrangThai
});
const CustomCard = withStyles(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      order: -1, // display on the left rather than on the right of the list
      width: '15em',
      marginRight: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))(Card);

const Aside = ({ record }) => (
  <CustomCard style={{ padding: '10px' }}>
    <Typography variant="h9">Thông tin người đặt hàng</Typography>
    {record && (
      record.userData && (
      <div>
        <ListItem
          button
          component={Link}
          to={`/nguoi-dung/${record.userData.maNguoiDung}`}
        >
          <ListItemText
            secondary="Họ và Tên"
          />
          <ListItemText
            primary={record.userData.hoTen}
          />
        </ListItem>
        <hr></hr>
        <ListItemText
          secondary="Số điện thoại"
        />
        <ListItemText
          primary={record.userData.sdt}
        />
        <ListItemText
          secondary="Thành phố"
        />
        <ListItemText
          primary={record.userData.thanhPho}
        />
        <ListItemText
          secondary="Giới tính"
        />
        <ListItemText
          primary={record.userData.gioiTinh.tenGioiTinh}
        />

      </div>
    ))}
  </CustomCard>
);


export const OrderEdit = (props) => {

  const redirect = useRedirect();
  const refresh = useRefresh();

  const onSuccess = ({ data }) => {
    redirect('/don-hang');
    refresh();
  };

  return (
    <Card style={{width:800}}>
      <CardContent>
        <BackButton />

        <Edit aside={<Aside />} title={<OrderTitle />} transform={transform} {...props} undoable={false} actions={<EditActions />} onSuccess={onSuccess}>
          <TabbedForm warnWhenUnsavedChangeses toolbar={<CustomToolbar />}>
            <FormTab label="Thông tin đặt hàng">
              <TextField source="maDonHang" label="Mã đơn hàng" />
              <TextField source="tenNguoiNhanHang" label="Tên người nhận hàng" />
              <NumberField source="giaTongCong" label="Tổng cộng giá tiền" />
              <TextField source="chuThich" label="Chú thích từ người mua" />
              <NumberField source="sdtgiaoHang" label="Số điện thoại giao hàng" />
              <TextField source="diaChiGiaoHang" label="Địa chỉ giao hàng" />
              <ReferenceInput source="trangThaiDonHang.maTrangThai" reference="trang-thai-don-hang" label="Tình trạng đơn hàng" >
                <RadioButtonGroupInput optionText="tenTrangThai" />
              </ReferenceInput>
            </FormTab>
          </TabbedForm>
        </Edit>
      </CardContent>
    </Card>
  );
};
