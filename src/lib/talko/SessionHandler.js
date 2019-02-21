import {TalkoSession}  from 'talko-react';

console.log("session", TalkoSession);

export default class SessionHandler extends TalkoSession {

    constructor() {
        super();
    }

    handleConnection(socket, defaultGreeting) {
        console.log("Hello, you are now connected!");
    }

}