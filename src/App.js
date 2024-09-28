import logo from "./logo.svg";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator, Button } from "@aws-amplify/ui-react";

function App({ signOut }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variation="primary" onClick={signOut}>
          Sign Out
        </Button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
