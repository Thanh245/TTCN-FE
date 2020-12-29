import * as React from 'react';
import { FC } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { useTranslate } from 'react-admin';
import { format, subDays, addDays } from 'date-fns';


const lastDay = new Date();
const lastMonthDays = Array.from({ length: 30 }, (_, i) => subDays(lastDay, i));
const aMonthAgo = subDays(new Date(), 30);

const dateFormatter = (date) =>
    new Date(date).toLocaleDateString();

const getRevenuePerDay = (orderInMonth) => {
    let keyArray = [];
    for (var key in orderInMonth) {
        keyArray.push(key);
    }
    keyArray.sort();

    let dayWithRevenue = keyArray.map((key)=>{
        return {
            date: key,
            total: orderInMonth[key]
        }
    })

    return dayWithRevenue;
}

const OrderChart = ({ orderInMonth }) => {
    const translate = useTranslate();
    if (!orderInMonth) return null;

    return (
        <Card>
            <CardHeader title="Doanh thu trong 30 ngày qua" />
            <CardContent>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={getRevenuePerDay(orderInMonth)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};


export default OrderChart;