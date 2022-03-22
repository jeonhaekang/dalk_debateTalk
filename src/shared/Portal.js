import ReactDOM from "react-dom";
import React from "react";

const Portal = ({ children }) => {
  const [domReady, setDomReady] = React.useState(false);
  const globalPortal = document.getElementById("globalPortal");

  React.useEffect(() => {
    setDomReady(true);
  });

  return domReady ? ReactDOM.createPortal(children, globalPortal) : null;
};

// https://stackoverflow.com/questions/54660685/react-and-using-reactdom-createportal-target-container-is-not-a-dom-element

export default Portal;
