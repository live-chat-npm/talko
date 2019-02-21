const Chat = require("./talko/Chat");
const TalkoSession = require("./talko/client/TalkoSession");
const UserList = require("./talko/UserList");

module.exports = {
    Chat: Chat.default,
    TalkoSession: TalkoSession.default,
    UserList: UserList.default
}