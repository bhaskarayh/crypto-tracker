import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import CryptoContext from "./CryptoContext.jsx";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

ReactDOM.render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>,
  document.getElementById("root")
);
