/**
 * Startpunkten för applikationen. Renderar App-komponenten till DOM-elementet med id "root".
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
