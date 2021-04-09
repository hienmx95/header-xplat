import React from 'react';

function More(props) {
  return React.createElement(
    "svg",
    { onClick: props.onClick, xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 18 18" },
    React.createElement(
      "g",
      { id: "Group_153", "data-name": "Group 153", transform: "translate(18) rotate(90)" },
      React.createElement("rect", { id: "Rectangle_45_Copy_14", "data-name": "Rectangle 45 Copy 14", width: "18", height: "18", fill: "none" }),
      React.createElement(
        "g",
        { id: "ellipsis", transform: "translate(2.25 7.875)" },
        React.createElement("path", { id: "Shape", d: "M0,1.125A1.125,1.125,0,1,0,1.125,0,1.125,1.125,0,0,0,0,1.125Z", fill: "#67748a" }),
        React.createElement("path", { id: "Shape-2", "data-name": "Shape", d: "M0,1.125A1.125,1.125,0,1,0,1.125,0,1.125,1.125,0,0,0,0,1.125Z", transform: "translate(5.625)", fill: "#67748a" }),
        React.createElement("path", { id: "Shape-3", "data-name": "Shape", d: "M0,1.125A1.125,1.125,0,1,0,1.125,0,1.125,1.125,0,0,0,0,1.125Z", transform: "translate(11.25)", fill: "#67748a" })
      )
    )
  );
}

export default More;