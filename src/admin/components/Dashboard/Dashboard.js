import * as React from "react";
import { Card} from '@material-ui/core';
import {
    useState,
    useEffect,
    useCallback,
} from 'react';
import { useVersion, useDataProvider} from 'react-admin';
import NewOrders from './NewOrders';
import Welcome from './Welcome';
import PendingOrder from './PendingOrder';
import MonthlyRevenue from './MonthlyRevenue';
import SpringDataProvider from "../../utils/SpringDataProvider";
import OrderChart from "./OrderChart";
import NewReviews from "./NewReviews";
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
    const version = useVersion();
    const [state, setState] = useState({});


    // Fetch Data /////////////////////////////////
    const fetchOrders = useCallback(async () => {
        const { data: recentOrders } = await dashboardProvider('GET_LIST',
            'don-hang',
            { pagination: { page: 1 , perPage: 10 }, 
                  sort: { field: "id", order: "DESC"}, 
                  filter: {} });
        const unCheckedOrders = recentOrders.filter(
            record => record.maTrangThai=== 1
        )
        const numOfUncheckedOrders = unCheckedOrders.length;

        setState(state => ({
            ...state,
            recentOrders,
            unCheckedOrders,
            numOfUncheckedOrders
        }));

    });

    

    const fetchRevenue = useCallback(async () =>{
        const { data: orderMonth } = await dashboardProvider("GET_LIST",
            'doanh-thu',
            {}
        );

        const totalInMonth = orderMonth["tongDoanhThu"];
        delete orderMonth["tongDoanhThu"]; 

        setState(state => ({
            ...state,
            orderMonth,
            totalInMonth
        }))
    })

    const fetchReview = useCallback(async () => {
        const { data: recentReviews } = await dashboardProvider('GET_LIST',
            'danh-gia',
            { pagination: { page: 1 , perPage: 10 }, 
                  sort: { field: "id", order: "DESC"}, 
                  filter: {} });
 
        setState(state => ({
            ...state,
            recentReviews
        }));

    });

    useEffect(() => {
        fetchOrders();
        fetchRevenue();
        fetchReview();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        recentOrders,
        unCheckedOrders,
        numOfUncheckedOrders,
        orderMonth,
        totalInMonth,
        recentReviews
    } = state;



      
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
                        <NewOrders value={numOfUncheckedOrders} />
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orderInMonth={orderMonth} />
                    </div>


                </div>
                <div style={styles.rightCol}>
                    <div style={styles.flex}>
                        <PendingOrder orders={unCheckedOrders} />
                        <Spacer />
                        <NewReviews reviews={recentReviews}/>
                    </div>
                </div>
            </div>
        </div>
    );
} 