import TalkoServer from './talko/server/TalkoServer';
import Session from './talko/server/Session';

const sessionHandler: Session = {
    handleConnection: socket => {
        
    },

    handleDisconnection: () => {

    }
};

const server = new TalkoServer(sessionHandler);

server.start(5050);