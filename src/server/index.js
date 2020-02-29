/**
|--------------------------------------------------
| *
| Server index file
| version 1.0.0
| (Laravel Echo and Socket.IO)
|--------------------------------------------------
*/

import AuthService from "../config/auth";
import Echo from "laravel-echo";
import { SOCKET_SERVER } from "../config/urls/env";

window.io = require("socket.io-client");

let Auth = new AuthService();

export default () => {
  // Have this in case you stop running your laravel echo server
  if (typeof io !== "undefined") {
    if (Auth.isLoggedIn()) {
      const options = {
        broadcaster: "socket.io",
        host: SOCKET_SERVER,
        auth: {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
            Accept: "application/json"
          }
        }
        // encrypted: true
      };

      window.Echo = new Echo(options);
    }
  }
};
