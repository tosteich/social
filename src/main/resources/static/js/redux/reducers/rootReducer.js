import {
    ADD_MESSAGE,
    UPDATE_MESSAGE,
    REMOVE_MESSAGE,
    EDIT_MESSAGE_TEXT,
    ADD_COMMENT,
    ADD_MESSAGE_PAGE, REFRESH_MESSAGE_PAGE
} from "redux/actionTypes";


const initialState = {
    messages: messages,
    profile: profile,
    ...frontendData,
    message: {id: null, text: ''}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE: {
            const message = action.payload;
            const addIndex = state.messages.findIndex(x => x.id === message.id);
            if (addIndex > -1) {
                return {
                    ...state,
                    messages: [
                        ...state.messages.slice(0, addIndex),
                        message,
                        ...state.messages.slice(addIndex + 1)
                    ]
                }
            } else return {
                ...state,
                messages: [
                    ...state.messages,
                    message
                ]
            }
        }
        case ADD_COMMENT: {
            const comment = action.payload;
            const addIndex = state.messages.findIndex(x => x.id === comment.message.id);
            const message = state.messages[addIndex];
            if (!message.comments.find(it => it.id === comment.id)) {
                return {
                    ...state,
                    messages: [
                        ...state.messages.slice(0, addIndex), {
                            ...message,
                            comments: [
                                ...message.comments,
                                comment
                            ]
                        },
                        ...state.messages.slice(addIndex + 1)
                    ]
                }
            } else return state
        }
        case UPDATE_MESSAGE: {
            const message = action.payload;
            const updateIndex = state.messages.findIndex(x => x.id === message.id);
            return {
                ...state,
                messages: [
                    ...state.messages.slice(0, updateIndex),
                    message,
                    ...state.messages.slice(updateIndex + 1)
                ]
            }
        }
        case EDIT_MESSAGE_TEXT:
            return {
                ...state,
                message: action.payload
            }
        case REMOVE_MESSAGE: {
            if (action.payload) {
                const deleteIndex = state.messages.findIndex(x => x.id === action.payload.id);
                if (deleteIndex > -1) {
                    return {
                        ...state,
                        messages: [
                            ...state.messages.slice(0, deleteIndex),
                            ...state.messages.slice(deleteIndex + 1)
                        ]
                    }
                }
            }
            return state;
        }
        case ADD_MESSAGE_PAGE: {
            const targetMessages = state.messages
                .concat(action.payload.messages)
                .reduce((res, val) => {
                    res[val.id] = val
                    return res
                }, {})
            return {
                ...state,
                messages: Object.values(targetMessages),
                currentPage: Math.min(action.payload.currentPage, action.payload.totalPages - 1),
                totalPages: action.payload.totalPages,
            }
        }
        case REFRESH_MESSAGE_PAGE: {
            return {
                ...state,
                messages: action.payload.messages,
                currentPage: Math.min(action.payload.currentPage, action.payload.totalPages - 1),
                totalPages: action.payload.totalPages,
            }
        }
        default:
            return state;
    }
}

