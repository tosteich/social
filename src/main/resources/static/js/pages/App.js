import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from "@material-ui/core/Avatar";
import {Switch, Route, Link, useLocation} from 'react-router-dom'
import {connect} from "react-redux";
import Auth from "pages/Auth";
import Messages from 'pages/Messages';
import Profile from "pages/Profile";
import Subscriptions from "pages/Subscriptions";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    profileName: {
        flexGrow: 1,
        alignSelf: 'center',
        marginRight: theme.spacing(2),
    },
    avatar: {
        alignSelf: 'center',
    },
    rightBlock: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(2),
    },
    authBlock: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: theme.spacing(10),
    }
}));

const App = (props) => {
    const classes = useStyles();
    const location = useLocation();


    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h5">
                        Sarafan
                    </Typography>
                    {props.profile && (
                        <div className={classes.authBlock}>
                            <Button disabled={location.pathname === "/"} component={Link} to='/'
                                    color='inherit'>Messages</Button>
                            <div className={classes.rightBlock}>
                                <Typography variant="body1" className={classes.profileName}>
                                    {props.profile.name}
                                </Typography>
                                <IconButton disabled={location.pathname === "/user"} component={Link} to='/user'
                                            color='inherit'>
                                    <Avatar alt={props.profile.name} src={props.profile.userpic}
                                            className={classes.avatar}/>
                                </IconButton>
                                <IconButton href='/logout' color='inherit'>
                                    <ExitToAppIcon/>
                                </IconButton>
                            </div>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {props.profile && (
                <Switch>
                    <Route exact path="/" component={Messages}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/user/:id?" component={Profile}/>
                    <Route path="/subscriptions/:id" component={Subscriptions}/>
                    <Route path="/*" component={Messages}/>
                </Switch>
            )}
            {!props.profile && (
                <Route path="*" component={Auth}/>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(App)