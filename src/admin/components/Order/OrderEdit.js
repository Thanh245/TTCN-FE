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
import RichTextInput from 'ra-input-rich-text';

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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
        
        <Edit title={<OrderTitle />} transform={transform} {...props} undoable={false} actions={<EditActions />} onSuccess={onSuccess}>
          <TabbedForm warnWhenUnsavedChangeses toolbar={<CustomToolbar />}>
            <FormTab label="Thông tin đặt hàng">
              <TextField source="maDonHang"  />
              <TextField source="tenNguoiNhanHang"  />
              <NumberField source="giaTongcong" />
              <TextField source="chuThich"  />
              <NumberField source="sdtgiaoHang" />
              <TextField source="diaChiGiaoHang" />
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
