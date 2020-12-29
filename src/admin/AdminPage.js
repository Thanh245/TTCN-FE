// in src/App.js
import * as React from "react";
import { Admin, Resource, ShowGuesser } from "react-admin";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ProductList } from "./components/Product/ProductList";
import { ProductCreate } from "./components/Product/ProductCreate";
import { ProductEdit } from "./components/Product/ProductEdit";
import { CategoryList } from "./components/Category/CategoryList";
import { CategoryEdit } from "./components/Category/CategoryEdit";
import authProvider from "./utils/authProvider";
import PostIcon from "@material-ui/icons/Book";
import { CustomerList } from "./components/Customer/CustomerList";
import { ReviewList } from "./components/Review/ReviewList";
import { theme } from "./theme";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SpringDataProvider from "./utils/SpringDataProvider";
import MyLayout from "./components/Layout/MyLayout";
import { CategoryCreate } from "./components/Category/CategoryCreate";
import { OrderList } from "./components/Order/OrderList";
import { OrderEdit } from "./components/Order/OrderEdit";

const dataProvider = SpringDataProvider(
  "http://localhost:8081"
);
export const AdminPage = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      dashboard={Dashboard}
      theme={theme}
      layout={MyLayout}
    >
      <Resource
        name="mat-hang"
        list={ProductList}
        icon={PostIcon}
        edit={ProductEdit}
        show={ShowGuesser}
        create={ProductCreate}
        options={{ label: 'Mặt Hàng' }}
        
      />
      <Resource
        name="loai-mat-hang"
        list={CategoryList}
        edit={CategoryEdit}
        show={ShowGuesser}
        create={CategoryCreate}
        options={{ label: 'Loại mặt hàng' }}
        icon={AccountTreeIcon} />
      <Resource
        name="don-hang"
        list={OrderList}
        options={{ label: 'Đơn đặt hàng' }}
        edit={OrderEdit}
        icon={AddShoppingCartIcon} />

      <Resource
        name="nguoi-dung"
        list={CustomerList}
        options={{ label: 'Người dùng' }}
        icon={AccountBoxIcon} />

      <Resource
        name="nguoi-dung-x"
        />

        <Resource
        name="trang-thai-don-hang"
        />
      <Resource 
        name="thong-tin-don-hang"
       />
      <Resource
        name="danh-gia"
        list={ReviewList}
        options={{ label: 'Đánh giá' }}
        icon={FeedbackIcon} />
    </Admin>
  );
}

