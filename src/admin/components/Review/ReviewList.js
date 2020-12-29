
import * as React from "react";
import { CardContent, CardHeader, Chip, makeStyles, Avatar, Card, CardActions} from '@material-ui/core';
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

const ReviewFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="Đánh giá người dùng" source="maLoaiMatHang" reference="loai-mat-hang" alwaysOn>
      <SelectInput optionText="tenLoaiMatHang" />
    </ReferenceInput>
  </Filter>
);

const Title = ({ record }) => {
  return <span>Đánh giá của người dùng</span>;
};
const pictures = [
  { url: 'product.jpeg', desc: 'First image' }
];

export const ReviewList = props => {
  var imageName = require('./test.jpg')

  return (
    <Card style={{width:1000}}>
      <CardContent>
        <List {...props} title={<Title />}>
          <Datagrid rowClick="edit">
            <DateField source="createdAt" label="Ngày đăng" />
            <ReferenceField source="maMatHang" reference="mat-hang" label="Mặt hàng">
              <ChipField source="tenMatHang" />
            </ReferenceField>
            <ReferenceField source="maNguoiDung" reference="nguoi-dung" label="Khách hàng" allowEmpty >
              <ChipField source="hoTen" />
            </ReferenceField>
            <NumberField source="soSao" label="Số sao" />
            <TextField source="noiDung" label="Nội dung" />
          </Datagrid>
        </List>
      </CardContent>
    </Card>

  );
}