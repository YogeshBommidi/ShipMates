import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-y7bvjgidpuz83cli.us.auth0.com"
      clientId="YR2Ha0eesWusPd0iJxbqDJ3z7OYEtXF2"
      authorizationParams={{
        redirect_uri: "https://shipmates.vercel.app",
      }}
      audience="http://localhost:8000"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
