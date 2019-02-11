export default interface Session {
  handleConnection(socket: any): void;

  handleDisconnection(): void;

  sendMessage(text: string): void;
}
