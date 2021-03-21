import Container from "@material-ui/core/Container";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getSubscriberList, changeSubscriptionStatus} from "api/profilesApi";
import {UserLink} from "../components/UserLink";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {SubscriptionInfo} from "../components/SubscriptionInfo";

const useStyles = makeStyles(theme => ({
    profileContainer: {
        marginTop: theme.spacing(12),
    },
    innerWrapper: {
        margin: 'auto'
    },
    profileTitle: {
        textAlign: 'center',
        marginBottom: theme.spacing(5),
    },
}));

const Subscriptions = props => {
    const classes = useStyles();

    const [subscriptions, setSubscriptions] = useState(
        []
    )

    useEffect(() => {
        getSubscriberList(props.profile.id).then(subscriptions => {
            setSubscriptions(subscriptions)
        });
    }, []);

    return (
        <Container className={classes.profileContainer}>
            <Typography variant="h4" className={classes.profileTitle}>
                User subscriptions
            </Typography>
            <Grid item xs={12} sm={10} md={8} lg={5} className={classes.innerWrapper}>
                {subscriptions.map((subscription, index) => {
                    return (
                        <SubscriptionInfo subscription={subscription} key={index}/>
                    )
                })}
            </Grid>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(Subscriptions)