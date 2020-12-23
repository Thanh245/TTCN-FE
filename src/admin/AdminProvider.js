
import React from 'react';
import { AdminPage } from './AdminPage'
import createAdminPage from './createAdminPage'
import { createHashHistory } from 'history';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from "react-admin";
import authProvider from "./utils/authProvider";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";

import { theme } from "./theme";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SpringDataProvider from "./utils/SpringDataProvider";
import MyLayout from "./components/Layout/MyLayout";

import { Provider } from 'react-redux';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProductList } from './components/Product/ProductList';
import { ProductEdit } from './components/Product/ProductEdit';
import { ProductCreate } from './components/Product/ProductCreate';
import { CategoryList } from './components/Category/CategoryList';
import { CategoryEdit } from './components/Category/CategoryEdit';
import { CategoryCreate } from './components/Category/CategoryCreate';
import { render } from '@testing-library/react';
const dataProvider = SpringDataProvider(
    "http://localhost:8081"
);
const history = createHashHistory();
export default class AdminProvider extends React.Component {

    render() {
        return (<Provider
            store={createAdminPage({
            authProvider,
            dataProvider,
            history,
        })}
    >
            <Admin
                dataProvider={dataProvider}
                dashboard={Dashboard}
                authProvider={authProvider}
                theme={theme}
                history={history}
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
                    options={{ label: 'Danh mục mặt hàng' }}
                    icon={AccountTreeIcon} />
                <Resource
                    name="don_hang"
                    list={ListGuesser}
                    options={{ label: 'Đơn đặt hàng' }}
                    icon={AddShoppingCartIcon} />
                <Resource
                    name="nguoi_dung"
                    list={ListGuesser}
                    options={{ label: 'Người dùng' }}
                    icon={AccountBoxIcon} />
                <Resource
                    name="danh-gia"
                    list={ListGuesser}
                    options={{ label: 'Đánh giá' }}
                    icon={FeedbackIcon} />
            </Admin>
        </Provider>)
    }
}
