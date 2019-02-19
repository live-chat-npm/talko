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
     * Handles a new connection. This method body is empty - override for usage
     * 
     * @param {SocketIO.Client} socket - The socket that has connected
     */
    handleConnection(socket) {

    }

    /**
     * Handles adding a customer to the support chat pool
     * 
     * @param {SocketIO.Client} socket - The socket which is sending the data
     * @param {string} name - The name of the customer
     */
    handleCustomer(socket, name) {
        socket.emit("customer", { name, id: socket.id })
    }

    /**
     * Handles the joining of a socket room
     * 
     * @param {SocketIO.Client} socket - The socket that is sending data
     * @param {number} room - The room that we're joining
     * @param {boolean} defaultGreeting - A flag to determine if we should send a default greeting 
     *                                    when joining the room
     */
    handleRoomJoin(socket, room, defaultGreeting) {
        socket.join(room);
        if (defaultGreeting) {
            socket.emit("greeting", "Welcome! Thank you for choosing talko.io");
        }
    }

    /**
     * Handles received messages sent from the talko client
     * 
     * @param {object} msg - The message object
     */
    handleMessageSend(socket, msg) {
        const { room } = msg;
        socket.broadcast.to(room).emit("send_message", msg);
    }

    /**
     * Handles a socket disconnection
     */
    handleDisconnection() {}

}

module.exports = TalkoSession;