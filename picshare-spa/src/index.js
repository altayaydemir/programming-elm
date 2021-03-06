/***
 * Excerpted from "Programming Elm",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/jfelm for more book information.
 ***/
import "./main.css";
import { Elm } from "./Main.elm";
import * as serviceWorker from "./serviceWorker";

const app = Elm.Main.init({
  node: document.getElementById("root"),
});

let socket = null;

const listen = (url) => {
  if (!socket) {
    socket = new WebSocket(url);
  }

  socket.onmessage = (event) => {
    app.ports.receive.send(event.data);
  };
};

app.ports.listen.subscribe(listen);

const close = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

app.ports.close.subscribe(close);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
