import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      region: "ap-northeast-1",
      userPoolClientId: "tqq48eopsoqn7ccvk4ki58gof",
      userPoolId: "ap-northeast-1_zejllCNBB",
      //      loginWith: {
      //        oauth: {
      //          domain: "react-amplify.auth.ap-northeast-1.amazoncognito.com",
      //          scopes: ["email"],
      //          redirectSignIn: ["http://localhost:3000/", "https://example.com/"],
      //          redirectSignOut: ["http://localhost:3000/", "https://example.com/"],
      //          responseType: "code",
      //        },
      //        username: "true",
      //        email: "true",
      //    },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
