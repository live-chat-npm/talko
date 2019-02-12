const TalkoServer = require('./talko/TalkoServer');
const SessionHandler = require('./SessionHandler');

const sessionHandler = new SessionHandler();
const server = new TalkoServer(sessionHandler);

// uncomment when needed - express app
// const app = server.getApp();

server.start(5050);