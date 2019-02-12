export default interface Session {

    handleConnection(socket: any): void;
    
    handleDisconnection(): void;

}