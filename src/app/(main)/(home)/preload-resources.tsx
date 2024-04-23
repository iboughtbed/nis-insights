"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("/images/heading-animation.webp", {
    as: "image",
    fetchPriority: "high",
  });

  return null;
}
