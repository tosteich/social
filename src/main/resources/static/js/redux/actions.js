import {
    ADD_MESSAGE,
    UPDATE_MESSAGE,
    REMOVE_MESSAGE,
    EDIT_MESSAGE_TEXT,
    ADD_COMMENT,
    ADD_MESSAGE_PAGE, REFRESH_MESSAGE_PAGE
} from "redux/actionTypes";
import {add, update, remove, getPage} from 'api/messagesApi'
import {addComment} from "api/commentsApi";


export const addMessageAction = message => {
    return dispatch => {
        add(message).then(message => dispatch ({
            type: ADD_MESSAGE,
            payload: message
        }))
    }
}

export const updateMessageAction = message => {
    return dispatch => {
        update(message).then(message => dispatch ({
            type: UPDATE_MESSAGE,
            payload: message
        }))
    }
}

export const removeMessageAction = message => {
    return dispatch => {
        remove(message).then(response => dispatch ({
            type: REMOVE_MESSAGE,
            payload: response.ok? message : null
        }))
    }
}

export const editMessageText = message => ({
    type: EDIT_MESSAGE_TEXT,
    payload: message
})

export const addMessageMutation = message => ({
    type: ADD_MESSAGE,
    payload: message
})

export const updateMessageMutation = message => ({
    type: UPDATE_MESSAGE,
    payload: message
})

export const removeMessageMutation = message => ({
    type: REMOVE_MESSAGE,
    payload: message
})

export const addCommentMutation = comment => ({
    type: ADD_COMMENT,
    payload: comment
})

export const addCommentAction = comment => {
    return dispatch => {
        addComment(comment).then(comment => dispatch ({
            type: ADD_COMMENT,
            payload: comment
        }))
    }
}

export const addMessagePageAction= currentPage => {
    return dispatch => {
        getPage(currentPage + 1).then(messagePageDto => dispatch ({
            type: ADD_MESSAGE_PAGE,
            payload: messagePageDto
        }))
    }
}

export const refreshMessagePageAction= () => {
    return dispatch => {
        getPage(0).then(messagePageDto => dispatch ({
            type: REFRESH_MESSAGE_PAGE,
            payload: messagePageDto
        }))
    }
}

// export const updateProfileAction= id => {
//     return dispatch => {
//         getProfile(id).then(profile => dispatch ({
//             type: UPDATE_PROFILE,
//             payload: profile
//         }))
//     }
// }
