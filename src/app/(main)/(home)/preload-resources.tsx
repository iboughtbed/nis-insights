"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  // ReactDOM.preload("/images/heading-animation.webp", {
  //   as: "image",
  //   fetchPriority: "high",
  // });

  // ReactDOM.preload("/images/animated-50.webp", {
  //   as: "image",
  //   fetchPriority: "high",
  // });

  // ReactDOM.preload("/images/animated-25.webp", {
  //   as: "image",
  //   fetchPriority: "high",
  // });

  ReactDOM.preload("/images/animated-10.webp", {
    as: "image",
    fetchPriority: "high",
  });

  return null;
}
