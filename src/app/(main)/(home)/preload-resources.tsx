"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("/images/animated-10.webp", {
    as: "image",
    fetchPriority: "high",
  });

  return null;
}
