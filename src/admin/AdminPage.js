// in src/App.js
import * as React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ProductList } from "./components/Product/ProductList";
import { ProductCreate } from "./components/Product/ProductCreate";
import { ProductEdit } from "./components/Product/ProductEdit";
import authProvider from "./utils/authProvider";
import DataProvider from "./utils/DataProvider";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";

const dataProvider = DataProvider(
  "https://my-json-server.typicode.com/pmdung2711/tokidokishop-fakeJsonServer/"
);
export const AdminPage = () => (
  <Admin
    dataProvider={dataProvider}
    dashboard={Dashboard}
    authProvider={authProvider}
  >
    <Resource
      name="mat_hang"
      list={ProductList}
      icon={PostIcon}
      edit={ProductEdit}
      create={ProductCreate}
      options={{ label: 'Mặt Hàng' }}
    />
    <Resource name="loai_mat_hang" list={ListGuesser} options={{ label: 'Danh mục mặt hàng' }}/>
  </Admin>
);
