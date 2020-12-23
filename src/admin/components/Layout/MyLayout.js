import * as React from 'react';
import { AppBar, UserMenu, MenuItemLink } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import { forwardRef } from 'react';
import Typography from '@material-ui/core/Typography';
import { Layout, LayoutProps, Sidebar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Logo from './Logo';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const ConfigurationMenu = forwardRef(({ onClick }, ref) => (
    <MenuItemLink
        ref={ref}
        to="/configuration"
        primaryText="Configuration"
        leftIcon={<SettingsIcon />}
        onClick={onClick} // close the menu on click
    />
));

const MyUserMenu = props => (
    <UserMenu {...props}>
        <ConfigurationMenu />
    </UserMenu>
);

const useSidebarStyles = makeStyles({
    drawerPaper: {
        backgroundColor: '#fffff',
    },
});

const MySidebar = props => {
    const classes = useSidebarStyles();
    return (
        <Sidebar classes={classes} {...props} />
    );
};


const MyAppBar = props => {
const classes = useStyles();
  return  (<AppBar {...props} userMenu={<MyUserMenu />}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <Logo />
            <span className={classes.spacer} />

</AppBar>)}


const MyLayout = props => <Layout {...props} appBar={MyAppBar} sidebar={MySidebar}/>;

export default MyLayout;