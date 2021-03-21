import Container from "@material-ui/core/Container";
import React from 'react';
import {connectToDb} from "util/ws";
import {addHandler} from "util/ws";
import {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {addMessageMutation, updateMessageMutation, removeMessageMutation, addCommentMutation} from "redux/actions";
import MessageForm from "components/messages/MessageForm";
import MessageText from 'components/messages/MessageText';
import LazyLoader from "components/LazyLoader";

const useStyles = makeStyles(theme => ({
    messagesContainer: {
        marginTop: theme.spacing(10),
    },
}));

const Messages = (props) => {

    const classes = useStyles();

    useEffect(() => {
        connectToDb()
        addHandler(data => {
            changeMessagesList(data)
        })
    }, []);

    const changeMessagesList = data => {
        if (data.objectType === 'MESSAGE') {
            switch (data.eventType) {
                case 'REMOVE':
                    props.removeMessageMutation(data.body)
                    break;
                case 'CREATE':
                    props.addMessageMutation(data.body)
                    break;
                case 'UPDATE':
                    props.updateMessageMutation(data.body)
                    break;
                default:
                    console.error('Looks like the event type is unknown "${data.eventType}"')
            }
        } else if (data.objectType === 'COMMENT') {
            switch (data.eventType) {
                case 'CREATE':
                    props.addCommentMutation(data.body)
                    break;
                default:
                    console.error('Looks like the event type is unknown "${data.eventType}"')
            }
        } else {
            console.error('Looks like the event type is unknown "${data.objectType}"')
        }
    }

    return (
        <Container className={classes.messagesContainer}>
            <MessageForm/>
            {props.messages.map(message => {
                return <MessageText message={message} key={message.id}/>;
            })}
            <LazyLoader/>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        messages: sorted (state.messages)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addMessageMutation: (message) => dispatch(addMessageMutation(message)),
        addCommentMutation: (comment) => dispatch(addCommentMutation(comment)),
        updateMessageMutation: (message) => dispatch(updateMessageMutation(message)),
        removeMessageMutation: (message) => dispatch(removeMessageMutation(message)),
    }
}

const sorted = messages => {
    return messages.sort((a, b) => -(a.id - b.id))
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)