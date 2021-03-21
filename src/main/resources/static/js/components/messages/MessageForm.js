import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { addMessageAction, editMessageText, updateMessageAction } from "redux/actions";
import {connect} from "react-redux";
import * as Sentry from "@sentry/react";

const useStyles = makeStyles(theme => ({

    message: {
        padding: theme.spacing(2),
    },
    inputWrapper: {
        display: 'flex',
    },
    buttonWrapper: {
        marginLeft: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column-reverse',
    },
}));

const MessageForm = (props) => {

    const classes = useStyles();
    const handleChange = e => {
        props.editMessageText({id: props.message.id, text: e.target.value});
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (props.message.text) {
            onSave(props.message);
            props.editMessageText({id: null, text: ''})
        }
    }

    const onSave = (message) => {
        if (message.id) {
            props.updateMessage(message)
        } else {
            props.addMessage(message)
        }
    }


    return (
        <Grid item xs={12} className={classes.message}>
            <form>
                <div className={classes.inputWrapper}>
                    <TextField
                        label="New message"
                        placeholder="Write something"
                        value={props.message.text}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className={classes.buttonWrapper}>
                        <Button variant="contained" onClick={handleSubmit}>Save</Button>
                    </div>
                </div>
            </form>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        message: state.message
    };
}

const mapDispatchToProps = dispatch => {
    return {
        editMessageText: (message) => dispatch(editMessageText(message)),
        addMessage: (message) => dispatch(addMessageAction(message)),
        updateMessage: (message) => dispatch(updateMessageAction(message)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)