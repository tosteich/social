import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

let stompClient = null;
const handlers = [];

export const connectToDb = () => {
    stompClient = Stomp.over( ()=> {
        return new SockJS('/gs-guide-websocket');
    })
    stompClient.debug = () => {};
    stompClient.connect({}, () => {
        stompClient.subscribe('/topic/activity', message => {
            handlers.forEach(handler => handler (JSON.parse(message.body)));
        });
    });
}

export const addHandler = handler => {
    handlers.push(handler)
}

export const send = data => {
    stompClient.send("/app/changeMessage", {}, data);
}

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

