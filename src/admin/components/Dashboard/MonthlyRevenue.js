import * as React from 'react';
import { FC } from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';


const MonthlyRevenue = ({ value }) => {
    return (
        <CardWithIcon
            icon={DollarIcon}
            title= "Doanh thu trong tháng"
            subtitle={value}
        />
    );
};

export default MonthlyRevenue;