import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const currentDate = new Date();

  const inputYear = date.getFullYear();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}`;

  if (inputYear !== currentYear) {
    return `${formattedDate}, ${inputYear}`;
  } else {
    return formattedDate;
  }
}

export function removeEmailDomain(email: string) {
  return email.split("@")[0];
}

export function isMacOs() {
  if (typeof window === "undefined") return false;

  return window.navigator.userAgent.includes("Mac");
}
