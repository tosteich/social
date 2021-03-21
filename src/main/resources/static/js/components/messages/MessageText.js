import React from 'react'
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from "@material-ui/core/Typography";
import {editMessageText, removeMessageAction} from "redux/actions";
import {connect} from "react-redux";
import {Media} from "../media/media";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import {UserLink} from "components/UserLink";



const useStyles = makeStyles((theme) => ({
    message: {
        padding: theme.spacing(2),
    },
    buttonsWrapper: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        marginBottom: -theme.spacing(1),
    },
    messageTextBlock: {
        marginTop: theme.spacing(2),
    },
}));

const MessageText = props => {

    const classes = useStyles();

    const handleEdit = e => {
        e.preventDefault();
        props.editMessageText(props.message);
    }

    const handleDelete = e => {
        e.preventDefault();
        props.removeMessage(props.message);
    }

    return (
        <Grid item xs={12} className={classes.message}>
            <Paper className={classes.message}>
                {props.message.author && (
                    <UserLink user={props.message.author}/>
                )}
                <div className={classes.messageTextBlock}>
                    <Typography variant="body1">{props.message.text}</Typography>
                </div>
                {props.message.link && (
                    <Media message={props.message}/>
                )}
                <div className={classes.buttonsWrapper}>
                    <IconButton onClick={handleEdit}><EditIcon/></IconButton>
                    <IconButton onClick={handleDelete}><DeleteIcon/></IconButton>
                </div>
                <CommentList message={props.message}/>
                <CommentForm messageId={props.message.id}/>
            </Paper>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        editMessageText: (message) => dispatch(editMessageText(message)),
        removeMessage: (message) => dispatch(removeMessageAction(message)),
    }
}

export default connect(null, mapDispatchToProps)(MessageText)