import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {addCommentAction} from "redux/actions";
import {connect} from "react-redux";

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

const CommentForm = (props) => {

    const [text, setText] = useState('');

    const classes = useStyles();
    const handleChange = e => {
        setText(e.target.value);
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (text) {
            onSave({text: text, message: {id: props.messageId}});
            setText('')
        }
    }

    const onSave = (comment) => {
       props.addComment(comment)
    }


    return (
        <Grid item xs={12} className={classes.message}>
            <form>
                <div className={classes.inputWrapper}>
                    <TextField
                        label="New comment"
                        placeholder="Write something"
                        value={text}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className={classes.buttonWrapper}>
                        <Button variant="contained" onClick={handleSubmit}>Add</Button>
                    </div>
                </div>
            </form>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (comment) => dispatch(addCommentAction(comment)),
    }
}

export default connect(null, mapDispatchToProps)(CommentForm)