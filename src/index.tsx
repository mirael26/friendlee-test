import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./components/app/app";
import './main.scss';


const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <App />
);