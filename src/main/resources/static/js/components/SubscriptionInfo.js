import React, {useState} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import {UserLink} from "./UserLink";
import Button from "@material-ui/core/Button";
import {changeSubscriptionStatus} from "../api/profilesApi";


const useStyles = makeStyles((theme) => ({
    subscribeButton: {
        marginLeft: theme.spacing(1),
    },
    userInfoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1),
    }
}));

export const SubscriptionInfo = (props) => {

    const classes = useStyles();
    const [isActive, setIsActive] = useState(
        props.subscription.active
    )

    function changeStatus ()  {
        changeSubscriptionStatus(props.subscription.subscriber.id).then(response => {
            setIsActive(response.active)
        })
    }

    return (
        <div className={classes.userInfoWrapper}>
            <UserLink user={props.subscription.subscriber}
                      iconSize='medium'
                      fontSize='body2'/>
            <Button className={classes.subscribeButton}
                    variant="contained"
                    onClick={changeStatus}
            >
                {isActive ? 'Dismiss': 'Approve'}
            </Button>
        </div>
    )
}
