import React from "react";
import ReactDOM from "react-dom/client";

// const heading = React.createElement(
//   "h1",
//   { id: "heading1" },
//   "Hello World From React"
// );
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);
// console.log(heading);

{
  /* <div id="parent">
  <div id="child">
    <h1>NOICE</h1>
    <h2>This is Sibling of NOICE</h2>
  </div>
</div> */
}

const heading = React.createElement("h1", {}, "NOICE");
const heading2 = React.createElement("h2", {}, "This is Sibling of NOICE");
const div = React.createElement("div", { id: "child" }, [heading, heading2]);
const parentdiv = React.createElement("div", { id: "parent" }, div);
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(parentdiv);

const elementToRender = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "NOICE"),
    React.createElement("h2", {}, "This is Sibling of NOICE!!!"),
  ])
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(elementToRender);
