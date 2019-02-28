
# Using Talko.io with React

## Getting Started

In this guide, we will setup our components in a React application and also configure a Node server to handle our socket connections.
   
   npm install talko-react --save

There are two components you can import from this package. The <Chat /> and the <UserList /> components.
Import the Chat component wherever you want it to be displayed and apply the following css styles 
import { Chat } from "talko-react";
    
    .chat {
      position: fixed;
      bottom: 0;
      right: 100px;
    }
    
This keeps the chat component at the bottom of the page. This component accepts five props. The first one is a theme, you can choose to use either a dark or a light theme. Just set theme to either dark or light. It also accepts a profile image for the representative, a title for his job position, a name, and a header title which is the text at the top of the modal.

    <Chat
     theme="light"
     profileImage={userImage}
     title="Our very best coder!"
     name="John Thummel"
     headerTitle="Support Chat"import { UserList } from "talko-react";
    />
    
  ## The Representative Component
  
  This component is intended to be used by the representatives in a company. Since it is a full view component you can make it a route or render it any place you want.
   
    import { UserList } from "talko-react";der!"   
   
   

   
  This component allows you to have chats with mulitple customers and navigate between conversations with tabs.
  
  ## Setting Up the Server
  
  Talko is designed to be run via Node.js. 
Start with setting up the SessionHandeler;

*	In your react app, create a folder named “server”
*	Create the file 'SessionHandler.js' in the Server Folder.
*  Within this file; place the following code:
_______________________________________________________________

const { TalkoSession } = require("talko-server");

class SessionHandler extends TalkoSession {
  handleConnection() {
    super.handleConnection();
    console.log("We are connected!!!");
  }
}

module.exports = SessionHandler;
_______________________________________________________________
SessionHandler extents the TalkoSession object which is necessary to connect the back end server to the front end of the Talko tool.

Now, we set up index.js files, which will consume the server object.

*	Download and install Node.
*	Within the server folder, create a file, named “index.js”
*	If you have not already, download the talko client “npm install talko-server”
*	Place the code below inside index.js:
_______________________________________________________________
   const path = require("path");
   const { TalkoServer } = require("talko-server");
   const SessionHandler = require("./SessionHandler");

   const sessionHandler = new SessionHandler();
   const server = new TalkoServer(sessionHandler);
   const express = server.getExpress();
   const app = server.getApp();

   app.use(express.static(`${__dirname}/../build`));
_______________________________________________________________
*	“TalkoServer”, is deconstructed from the “talko-server” download from npm.
*	“SessionClient” (setup earlier) is supplied as an argument to TalkoServer object, yielding a server object.
*	Involking server.getExpress(); returns the express object that connects to Socket.io.

This sets up the server side of your Talko tool.


