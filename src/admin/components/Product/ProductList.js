import * as React from "react";

import {  Card, makeStyles} from '@material-ui/core';
import {
  List,
  Filter,
  Datagrid,
  NumberField,
  TextField,
  EditButton,
  TextInput,
  ChipField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  ImageField,
  ListBase,
  Pagination
} from 'react-admin';
import GridList from './GridList';



const ProductFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="Loại mặt hàng" source="maLoaiMatHang" reference="loai-mat-hang" alwaysOn>
      <SelectInput optionText="tenLoaiMatHang" />
    </ReferenceInput>
  </Filter>
);

const useImageFieldStyles = makeStyles(theme => ({
  image: { // This will override the style of the <img> inside the <div>
      height: 70,
  }
}));


const Title = ({ record }) => {
  return <span>Danh sách Mặt hàng</span>;
};

const styles = {
  image: { maxHeight: '3rem' }
}

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const ProductList = (props) => {
  const imageFieldClasses = useImageFieldStyles();
  return (
    <Card style={{ margin:20, width:1000, padding:10}}>
      <List filters={<ProductFilter />} title={<Title />} {...props}>

         <GridList />
      </List>

    </Card>

  );

} 