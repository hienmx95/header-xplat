
import React from 'react';

function Dot() {
  return React.createElement(
    "svg",
    { height: "100%", width: "100%" },
    React.createElement("circle", { cx: "50%", cy: "50%", r: "3", fill: "#67748a" })
  );
}

export default Dot;