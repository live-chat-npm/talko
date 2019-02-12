/**
 * A session handler skeleton for handling a socket session in the talko server
 * 
 * @author Thomas Papp
 */
class TalkoSession {

    /**
     * Constructs a new talko session. Does not allow direct instances, you must extend off this class.
     */
    constructor() {
        if (new.target === TalkoSession) {
            throw new TypeError("Cannot construct TalkoSession instaces directly! Please extend this class.")
        }
    }

    /**
     * Handles a new connection
     * 
     * @param {socket} socket - The socket that has connected
     */
    handleConnection(socket, defaultGreeting) {
        if (defaultGreeting) {
            socket.emit("greeting", "You are now connected! Welcome to Talko!");
        }
    }

    /**
     * Handles received messages sent from the talko client
     * 
     * @param {object} msg - The message object
     */
    handleMessageSend(socket, msg) {
        socket.emit("send_message", msg);
        socket.broadcast.emit("send_message", msg);
    }

    /**
     * Handles a socket disconnections
     */
    handleDisconnection() {}

}

module.exports = TalkoSession;