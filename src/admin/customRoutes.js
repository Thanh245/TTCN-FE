import { CategoryList } from "./components/Category/CategoryList";
import { ProductList } from "./components/Product/ProductList";
import * as React from "react";
import { Route } from 'react-router-dom';

export default [
    <Route exact path="/admin/mat-hang" component={ProductList} />,
    <Route exact path="/admin/loai-mat-hang" component={CategoryList} />,
    <Route exact path="/admin/don-hang" component={CategoryList} />,
    <Route exact path="/admin/loai-mat-hang" component={CategoryList} />,
    <Route exact path="/admin/loai-mat-hang" component={CategoryList} />,
    <Route exact path="/admin/loai-mat-hang" component={CategoryList} />
];