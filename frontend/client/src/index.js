import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter, faFontAwesome)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
