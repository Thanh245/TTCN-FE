import * as React from 'react';
import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useTranslate, DateField, ReferenceField} from 'react-admin';
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    TextField
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

const NewReviews = ({ reviews = []}) => {
    const classes = useStyles();
    return (
        <CardWithIcon
            to="/danh-gia"
            icon={ShoppingCartIcon}
            title="Đánh giá mời từ người dùng"
        >
            <List dense={true}>
                {reviews.map(record => {
                   return (
                    <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={`/danh-gia/${record.id}`}
                    >
                        <ListItemText
                            primary={record.maNguoiDung}
                            secondary={record.noiDung}
                        />
                    </ListItem>
                )
            })
            }
            </List>
            <Button
                className={classes.link}
                component={Link}
                to="/danh-gia"
                size="small"
                color="primary"
            >
                <Box p={1} className={classes.linkContent}>
                    Xem toàn bộ đánh giá
                </Box>
            </Button>
        </CardWithIcon>
    );
};

export default NewReviews;