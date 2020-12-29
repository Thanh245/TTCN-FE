import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import {
    useState,
    useEffect,
    useCallback,
    FC,
    CSSProperties,
} from 'react';
import { useVersion, useDataProvider, Query, Loading, useQuery } from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { subDays } from 'date-fns';

import Welcome from './Welcome';
import PendingOrder from './PendingOrder';
import MonthlyRevenue from './MonthlyRevenue';
import SpringDataProvider from "../../utils/SpringDataProvider";
import OrderChart from "./OrderChart";
const dashboardProvider = SpringDataProvider("http://localhost:8081");


const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

function sum( obj ) {
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
      }
    }
    return sum;
  }


export const Dashboard = () => {
    const dataProvider = useDataProvider();
    const version = useVersion();
    const [state, setState] = useState({});


    // Fetch Data /////////////////////////////////
    const fetchOrders = useCallback(async () => {
        const { data: recentOrders } = await dashboardProvider('GET_LIST',
            'don-hang',
            { pagination: { page: 1 , perPage: 10 }, 
                  sort: { field: "id", order: "DESC"}, 
                  filter: {} });
        
        setState(state => ({
            ...state,
            recentOrders,
        }));

    });

    const fetchRevenue = useCallback(async () =>{
        const { data: orderMonth } = await dashboardProvider("GET_LIST",
            'doanh-thu',
            {}
        );
        setState(state => ({
            ...state,
            orderMonth
        }))
    })

    useEffect(() => {
        fetchOrders();
        fetchRevenue();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        recentOrders,
        orderMonth
    } = state;

    const totalInMonth = sum(orderMonth);


    // Return Component ///////////////////////////
    return (
        <div>
            <Card>
                <Welcome />
            </Card>
            <br />
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                        <MonthlyRevenue value={totalInMonth}/>
                        <Spacer />
                        <MonthlyRevenue />
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orderInMonth={orderMonth} />
                    </div>


                </div>
                <div style={styles.rightCol}>
                    <div style={styles.flex}>
                        <PendingOrder orders={recentOrders} />
                        <Spacer />
                        <PendingOrder />
                    </div>
                </div>
            </div>
        </div>
    );
} 