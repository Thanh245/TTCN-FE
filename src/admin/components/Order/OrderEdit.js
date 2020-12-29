import * as React from "react";
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

import RichTextInput from 'ra-input-rich-text';

import { Card, CardContent, withStyles } from '@material-ui/core';
import CardActions from "@material-ui/core/CardActions";
import BackButton from "../BackButton/BackButton";
import { InputAdornment } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

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
    <CustomCard style={{ padding:'20px'}}>
        <Typography variant="h6">Thông tin đơn hàng</Typography>
        {record && (
            <TextField inputProps={record.maDonHang} label="Mã đơn hàng" />
      
        )}
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
    <Card>
      <CardContent>
        <BackButton />
        
        <Edit aside={<Aside />} title={<OrderTitle />} transform={transform} {...props} undoable={false} actions={<EditActions />} onSuccess={onSuccess}>
          <TabbedForm warnWhenUnsavedChangeses toolbar={<CustomToolbar />}>
            <FormTab label="Thông tin đặt hàng">
              <TextField source="maDonHang" label="Mã đơn hàng" />
              <TextField source="tenNguoiNhanHang"  label="Tên người nhận hàng"/>
              <NumberField source="giaTongCong" label="Tổng cộng giá tiền"/>
              <TextField source="chuThich"  label="Chú thích từ người mua"/>
              <NumberField source="sdtgiaoHang" label="Số điện thoại giao hàng" />
              <TextField source="diaChiGiaoHang" label="Địa chỉ giao hàng" />
              <ReferenceInput source="trangThaiDonHang.maTrangThai" reference="trang-thai-don-hang" label="Tình trạng đơn hàng" >
                <RadioButtonGroupInput optionText="tenTrangThai"/>
              </ReferenceInput>
            </FormTab>
          </TabbedForm>
        </Edit>
      </CardContent>
    </Card>
  );
};
