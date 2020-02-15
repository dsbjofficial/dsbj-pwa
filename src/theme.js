import {red, deepPurple, indigo} from '@material-ui/core/colors';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';

// A custom theme for this app
export const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: deepPurple["500"],
        },
        secondary: {
            main: indigo.A400
        },
        error: {
            main: red.A400,
        }
    },
});

const drawerWidth = 240;
export const useDefaultStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    appBar: {
        // zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        // flexGrow: 1,
        padding:  theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth,
        },
    },
    navActive: {
        backgroundColor: theme.palette.action.selected
    },
    brand: {
        margin: "auto",
        textAlign: "center",
        maxWidth: "70%",
        maxHeight: "70%",
        filter: `drop-shadow(1px 2px 1px rgba(40, 40, 40, 0.3))`
    },
}));
