import ReactDOM from "react-dom";
import React from "react";

const Portal = ({ children }) => {
  const [domReady, setDomReady] = React.useState(false);
  const globalProtal = document.getElementById("globalProtal");

  React.useEffect(() => {
    setDomReady(true);
  });

  // return domReady ? ReactDOM.createPortal(children, globalProtal) : null;
  return null;
};

// https://stackoverflow.com/questions/54660685/react-and-using-reactdom-createportal-target-container-is-not-a-dom-element

export default Portal;
