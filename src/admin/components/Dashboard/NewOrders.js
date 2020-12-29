import * as React from 'react';
import { FC } from 'react';
import { useTranslate } from 'react-admin';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import CardWithIcon from './CardWithIcon';


const NewOrders = ({ value }) => {
    return (
        <CardWithIcon
            icon={AddShoppingCartIcon}
            title= "Số đơn hàng chưa xử lý"
            subtitle={value}
        />
    );
};

export default NewOrders;