import * as React from 'react';
import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useTranslate, DateField} from 'react-admin';
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar
} from '@material-ui/core';
import CardWithIcon from './CardWithIcon';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
}));

const PendingOrders = ({ orders = []}) => {
    const classes = useStyles();
    return (
        <CardWithIcon
            to="/don-hang"
            icon={ShoppingCartIcon}
            title="Đơn hàng mới"
        >
            <List dense={true}>
                {orders.map(record => {
                   let date = record.createdAt;
                   const time = `${date.getHours}:${date.getMinutes}, ${date.getDate}`;

                   return (
                    <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={`/don-hang/${record.id}`}
                    >
                        <ListItemText
                            primary={record.tenNguoiNhanHang}
                            secondary={record.createdAt}
                        />
                        <ListItemSecondaryAction>
                            <span className={classes.cost}>
                                {record.giaTongCong}đ
                            </span>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })
            }
            </List>
            <Button
                className={classes.link}
                component={Link}
                to="/don-hang"
                size="small"
                color="primary"
            >
                <Box p={1} className={classes.linkContent}>
                    Xem toàn bộ đơn hàng
                </Box>
            </Button>
        </CardWithIcon>
    );
};

export default PendingOrders;