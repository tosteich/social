import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    medium: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

export default function CommentList(props) {
    const classes = useStyles();

    let comments = props.message.comments ? props.message.comments : [];

    return (
        <List subheader={<ListSubheader>Comments</ListSubheader>}>
            {comments.map((comment, index) => {
                let userLink = '/user/' + comment.author.id;
                return (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={comment.author.name}
                                        src={comment.author.userpic}
                                        className={classes.medium}
                                        component={Link} to={userLink}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="body2"
                                                color="textPrimary"
                                                component={Link} to={userLink}>
                                        {comment.author.name}
                                    </Typography>
                                }
                                secondary={
                                    <React.Fragment>
                                        {comment.text}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        {(index !== comments.length - 1) && (
                            <Divider variant="inset" component="div"/>
                        )}
                    </React.Fragment>
                )
            })}
        </List>
    );
}