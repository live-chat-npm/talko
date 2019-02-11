import http from 'http';
import socketIO from 'socket.io';
import express from 'express';
import { json } from 'body-parser';

const app = express();
const server = http.createServer();
const io = socketIO(server);

io.on('connection', (socket: any) => {
    console.log("connected!");
    // todo: emit a default greeting
    socket.emit('greeting', { greeting: 'You are now connected!' });

    // on disconnect
    socket.on('disconnect', () => {
        console.log("disconnected");
    });
});

export default class TalkoServer {

    port: number;

    constructor(port: number) {
        this.port = port;
    }

    /**
     * Starst the talko server to start listening for data
     */
    start(): void {
        server.listen(this.port, () => console.log(`Talko server listening on port ${this.port}`));
    }

}