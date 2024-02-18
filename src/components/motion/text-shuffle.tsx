"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "~/lib/utils";

interface TextShuffleProps {
  text: string;
  interval?: number;
  className?: string;
}

export function TextShuffle({
  text,
  interval = 100,
  className,
}: TextShuffleProps) {
  const [shuffledText, setShuffledText] = useState(text);
  const [isComplete, setIsComplete] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let currentIndex = 0;

      // Introduce a delay of 500ms before starting the shuffling process
      const delayTimeout = setTimeout(() => {
        const shuffleInterval = setInterval(() => {
          const newText = Array.from(text, (char, index) => {
            if (index <= currentIndex) {
              return char;
            }
            return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Random uppercase letter
          }).join("");

          setShuffledText(newText);

          currentIndex++;

          if (currentIndex >= text.length) {
            clearInterval(shuffleInterval);
            setIsComplete(true);
          }
        }, interval);

        return () => {
          clearInterval(shuffleInterval);
        };
      }, 500); // Adjust the delay as needed

      return () => {
        clearTimeout(delayTimeout);
      };
    }
  }, [isInView, text, interval]);

  return (
    <h1
      className={cn(className, isComplete ? "break-words" : "break-all")}
      ref={ref}
    >
      {shuffledText}
    </h1>
  );
}
