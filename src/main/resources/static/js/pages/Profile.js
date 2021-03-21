import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import {getProfile, changeSubscription} from 'api/profilesApi'
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    refreshMessagePageAction,

} from "../redux/actions";
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    cardRoot: {
        display: 'flex',
    },
    profileTitle: {
        textAlign: 'center',
    },
    userInfoBlock: {
        marginLeft: theme.spacing(2),
    },
    media: {
        height: 200,
        width: 200,
    },
    profileContainer: {
        marginTop: theme.spacing(12),
    },
    innerWrapper: {
        margin: 'auto'
    },
    subscribeButton: {
        marginLeft: theme.spacing(1),
    }


}));

const Profile = (props) => {
    const classes = useStyles();
    const id = props.match.params.id || props.myProfile.id;
    const [profile, setProfile] = useState({
        profile: null
    })
    const isMyProfile = !id || id === props.myProfile.id
    const isSubscribed = () => {
        return profile.subscribers &&
            profile.subscribers.find(subscription => {
                return subscription.subscriber === props.myProfile.id
            })
    }

    const updateSubscription = () => {
        changeSubscription(profile.id).then(profile => {
            setProfile(profile)
 //           props.refreshMessages();
        });
    }

    useEffect(() => {
        let isCurrent = true
        getProfile(id).then(profile => {
            if (isCurrent) {
                setProfile(profile)
            }
        });
        return () => {
            isCurrent = false
        }
    }, [id]);

    return (
        <Container className={classes.profileContainer}>
            <Typography variant="h4" className={classes.profileTitle}>
                User profile
            </Typography>
            <Grid item xs={12} sm={10} md={8} lg={5} className={classes.innerWrapper}>
                <Card variant="outlined">
                    <CardContent className={classes.cardRoot}>
                        {profile.userpic ? (
                            <CardMedia
                                component="img"
                                alt={profile.name}
                                src={profile.userpic}
                                title={profile.name}
                                className={classes.media}
                            />
                        ) : (
                            <CircularProgress />
                        )}
                        <div className={classes.userInfoBlock}>
                            <Typography variant="body1">{profile.name}</Typography>
                            <Typography variant="body2">{profile.locale}</Typography>
                            <Typography variant="body2">{profile.gender}</Typography>
                            <Typography variant="body2">{profile.lastVisit}</Typography>
                            <Typography variant="body2">
                                {profile.subscriptions && profile.subscriptions.length} subscriptions
                            </Typography>
                            {isMyProfile && (
                                <Typography variant="body2" component={Link} to={'/subscriptions/'+profile.id}>
                                    {profile.subscribers && profile.subscribers.length} subscribers
                                </Typography>
                            )}
                            {!isMyProfile && (
                                <Typography variant="body2">
                                    {profile.subscribers && profile.subscribers.length} subscribers
                                </Typography>
                            )}
                        </div>
                    </CardContent>
                    <CardActions>
                        {!isMyProfile && (
                            <Button className={classes.subscribeButton}
                                    variant="contained"
                                    onClick={updateSubscription}
                            >
                                {isSubscribed()? 'Unsubscribe': 'Subscribe'}
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Grid>
        </Container>
    )
}


const mapStateToProps = state => {
    return {
        myProfile: state.profile
    };
}

const mapDispatchToProps = dispatch => {
    return {
        refreshMessages: () => dispatch(refreshMessagePageAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)