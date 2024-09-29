import logo from "./logo.svg";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import React from "react";
import BookkeepingProblem from "./components/BookkeepingProblem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>user.username: {user.username}</h1>
          <DndProvider backend={HTML5Backend}>
            <div className="App">
              <BookkeepingProblem />
            </div>
          </DndProvider>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

//export default withAuthenticator(App);
