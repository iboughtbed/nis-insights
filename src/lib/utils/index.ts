import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createId(length = 7) {
  return customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length,
  )();
}

export function formatDateToLocale(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  return formattedDate;
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

export function transliterate(input: string) {
  const cyrillicMap: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sh",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  return input
    .split("")
    .map((char) => cyrillicMap[char.toLowerCase()] ?? char)
    .join("");
}

export function slugify(str: string) {
  const transliterated = transliterate(str);
  return transliterated
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function truncate(text: string, maxLength = 160, ellipsis = true) {
  if (text.length <= maxLength) {
    return text;
  }

  const truncatedText = text.substring(0, maxLength - (ellipsis ? 3 : 0));

  return ellipsis ? truncatedText + "..." : truncatedText;
}

export function removeEmailDomain(email: string) {
  return email.split("@")[0];
}

export function isMacOs() {
  if (typeof window === "undefined") return false;

  return window.navigator.userAgent.includes("Mac");
}
