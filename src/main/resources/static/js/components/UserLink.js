import React from 'react'
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
    userInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    userName: {
        alignSelf: 'center',
        marginLeft: theme.spacing(2),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    medium: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
}));

export const UserLink = (props) => {

    const classes = useStyles();
    let userLink = '/user/' + props.user.id;
    let iconSize = props.iconSize? props.iconSize : 'large'
    let fontSize = props.fontSize? props.fontSize : 'body1'

    return (
        <div className={classes.userInfo}>
            <Avatar alt={props.user.name}
                    src={props.user.userpic}
                    className={classes[iconSize]}
                    component={Link}
                    to={userLink}/>
            <Typography className={classes.userName}
                        variant={fontSize}
                        component={Link}
                        to={userLink}
            >{props.user.name}
            </Typography>
        </div>
    )
}
