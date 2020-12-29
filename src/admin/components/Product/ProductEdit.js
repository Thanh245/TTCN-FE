import * as React from "react";
import {
  TopToolbar,
  Toolbar,
  SaveButton,
  DeleteButton,
  Edit,
  CloneButton,
  ShowButton,
  EditButton,
  FormTab,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TabbedForm,
  TextInput,
  required,
  useRedirect,
  useRefresh
} from "react-admin";
import RichTextInput from 'ra-input-rich-text';

import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
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



const ProductTitle = ({ record }) => {
  return <span>Mặt hàng {record ? `${record.tenMatHang}` : ""}</span>;
};
const transform = data => {

  let type = 'ADD IMAGE';
  const newLen = data.danhSachHinhAnhNew.length;
  if (newLen < data.danhSachHinhAnh.length) {
    type = 'DELETE'
  }

  if (type === 'DELETE') {
    let idList = data.danhSachHinhAnh.map((image) => {
      return image.maAnhMatHang;
    })
    let idToBeKept = data.danhSachHinhAnhNew.map((image) => {
      return image.maAnhMatHang;
    })
    let idToBeRemoved = idList.filter( 
      p => (idToBeKept.indexOf(p) == -1)
    )
    return ({
      "type" : "DELETE",
      "maMatHang": data.maMatHang,
      "imagesIdTobeDeleted": idToBeRemoved
    })
    
  }

  const newPictures = data.danhSachHinhAnhNew.filter(
    p => p.rawFile instanceof File
  );
  if (newPictures.length > 0) {
    return ({
      "type": "CREATE",
      "maMatHang": data.maMatHang,
      "newImages": newPictures
    })
  }
  return ({
    "maMatHang": data.maMatHang,
    "tenMatHang": `${data.tenMatHang}`,
    "loaiMatHang": { "maLoaiMatHang": data.loaiMatHang.maLoaiMatHang },
    "gia": data.gia,
    "soLuong": data.soLuong,
    "soLuongDaBan": data.soLuongDaBan,
    "moTa": `${data.moTa}`,
    "rate": data.rate,
    "soLuotDanhGia": data.soLuotDanhGia,
  })

}
  ;
export const ProductEdit = (props) => {

  const redirect = useRedirect();
  const refresh = useRefresh();
  const id = props.id;

  const onSuccess = ({ data }) => {
    redirect('/mat-hang');
    refresh();
  };

  return (
    <Card style={{ width: 1000 }} overflow="visible">
      <CardContent>
        <BackButton />

        <Edit title={<ProductTitle />} {...props} transform={transform} undoable={false} actions={<EditActions />} onSuccess={onSuccess}>
          <TabbedForm warnWhenUnsavedChangeses toolbar={<CustomToolbar />}>
            <FormTab label="Thông tin chung">
              <TextInput source="maMatHang" disabled />
              <TextInput source="tenMatHang" validate={required()} resettable />

              <ReferenceInput source="loaiMatHang.maLoaiMatHang" reference="loai-mat-hang" label="Loại mặt hàng" allowEmpty>
                <SelectInput optionText="tenLoaiMatHang" source="maLoaiMatHang" />
              </ReferenceInput>
            </FormTab>
            <FormTab label="Mô tả">
              <RichTextInput
                source="moTa"
                label=""
                validate={required()}
                addLabel={false}
              />
            </FormTab>
            <FormTab label="Chi tiết">
              <NumberInput source="soLuong" validate={required()} />
              <NumberInput source="soLuongDaBan" validate={required()} />
              <NumberInput source="rate" validate={required()} />
              <NumberInput source="soLuotDanhGia" validate={required()} />
              <NumberInput
                source="gia"
                validate={required()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  )
                }}
              />
            </FormTab>
            <FormTab label="Danh sách Hình ảnh">
              <ImageInput
                multiple source="danhSachHinhAnhNew"
                accept="image/*"
                label="Tải lên ảnh mới">
                <ImageField source="anh" addLabel={false} />
              </ImageInput>

            </FormTab>
          </TabbedForm>
        </Edit>
      </CardContent>
    </Card>
  );
};
