const TalkoSession = require("./lib/talko/TalkoSession");

class SessionHandler extends TalkoSession {
  handleDisconnection() {
    console.log("Disconnected!");
  }
}

module.exports = SessionHandler;
