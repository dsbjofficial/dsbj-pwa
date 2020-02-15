import React, {useState} from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import {IconButton, Typography, Hidden, CardHeader, CardContent} from "@material-ui/core"

import {Card, CardMedia} from "@material-ui/core"
import {AppBar, Toolbar} from "@material-ui/core"
import {
    Container,
    Box,
    Paper,
    Menu,
    MenuItem,
    MenuList,
    Grid,
    Drawer,
    SwipeableDrawer,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from "@material-ui/core"
import {Skeleton} from "@material-ui/lab"
import {Menu as MenuIcon, ChevronLeft, Person, Info, Home, Settings} from "@material-ui/icons"
import {useDefaultStyles} from "../theme"
import {useAuth0} from "./auth/Auth"

const DrawerNavLink = (props) => {
    const {icon, iconProps, text, to} = props;
    const classes = useDefaultStyles();

    return (
        <ListItem button to={to} component={NavLink} activeClassName={classes.navActive} exact>
            <ListItemIcon>{React.createElement(icon, iconProps)}</ListItemIcon>
            <ListItemText {...text}/>
        </ListItem>
    )
};

const Navigation = (props) => {
    const {container} = props;
    const classes = useDefaultStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => {
        setDrawerOpen(true);
    };
    const closeDrawer = () => {
        setDrawerOpen(false);
    };
    const {isAuthenticated, loginWithRedirect, logout, user, loading} = useAuth0();
    const signOut = () => {
        logout({returnTo: window.location.origin.toString()});
    };
    console.log(user);
    const drawerContents = (
        <>
            {/*<div className={classes.toolbar}/>*/}
            <Box p={2}>
                {
                    loading ? (
                        <>
                            <Grid container direction="row" alignItems="center">
                                <Skeleton variant="circle" width={40} height={40} animation="wave"/>
                                <Box ml={1}>
                                    <Skeleton variant="rect" height={10} width={100} animation="wave"/>
                                </Box>
                            </Grid>
                            <Skeleton variant="text" width={100} animation="wave"/>
                            <Skeleton variant="text" width={100} animation="wave"/>
                            <Skeleton variant="text" width={100} animation="wave"/>
                        </>
                    ) : (
                        isAuthenticated ? (
                            <>
                                <Grid container direction="column" alignItems="flex-start">
                                    <Avatar src={user.picture}/>
                                    <Box mt={2}>
                                        <Typography variant="h6">
                                            {`${user.given_name} ${user.family_name}`}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </>
                        ) : (
                            <></>
                        )
                    )
                }
            </Box>
            <Divider/>
            <List>
                <DrawerNavLink icon={Home} to="/" text={{primary: "Home"}}/>
            </List>
            <Divider/>
            <List>
                <ListSubheader>Account</ListSubheader>
                <DrawerNavLink icon={Person} to="/profile" text={{primary: "Profile"}}/>
            </List>
            <Divider/>
            <List>
                <DrawerNavLink icon={Info} to="/about" text={{primary: "About"}}/>
            </List>
        </>
    );

    return (
        <>
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar>
                    <Hidden smUp>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={openDrawer}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography component="h1" variant="h5">
                            Crizzle
                        </Typography>
                    </Hidden>
                    <Hidden xsDown>
                        <></>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden smUp>
                    <SwipeableDrawer
                        container={container}
                        variant="temporary"
                        classes={{paper: classes.drawerPaper}}
                        open={drawerOpen}
                        onClose={closeDrawer}
                        onOpen={openDrawer}
                        ModalProps={{keepMounted: true}}
                    >
                        {drawerContents}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden xsDown>
                    <Drawer variant="permanent" open classes={{paper: classes.drawerPaper}}>
                        {drawerContents}
                    </Drawer>
                </Hidden>
            </nav>
        </>
    );
};

export default withRouter(Navigation);
