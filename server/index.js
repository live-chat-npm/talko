const TalkoServer = require('./talko/TalkoServer');
const SessionHandler = require('./SessionHandler');

const sessionHandler = new SessionHandler();
const server = new TalkoServer(sessionHandler);

server.start(5050);