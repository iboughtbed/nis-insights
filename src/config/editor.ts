import { Icons } from "~/components/icons";

const addHeading = (text = "Heading") => `### ${text}`;

const addBold = (text = "Bold") => `**${text}**`;

const addItalic = (text = "Italic") => `*${text}*`;

const addQuote = (text = "Quote") => `> ${text}`;

const addCode = (text = 'print("hello, world")') => `\`${text}\``;

const addCodeBlock = (text = 'print("hello, world")') =>
  `\`\`\`python\n${text}\n\`\`\``;

const addLink = (text = "link") => `[${text}](https://example.com)`;

const addOrderedList = (text = "item") =>
  text
    .split("\n")
    .map((item, index) => `${index + 1}. ${item}`)
    .join("\n");

const addUnorderedList = (text = "item") =>
  text
    .split("\n")
    .map((item) => `- ${item}`)
    .join("\n");

const addTaskList = (text = "task") =>
  text
    .split("\n")
    .map((item) => `- [] ${item}`)
    .join("\n");

const addTable = () =>
  `\n| Header | Header |\n|--------|--------|\n| Cell | Cell |\n| Cell | Cell |`;

export const commands = [
  {
    title: "Heading",
    handler: addHeading,
    Icon: Icons.heading,
  },
  {
    title: "Bold",
    handler: addBold,
    Icon: Icons.bold,
  },
  {
    title: "Italic",
    handler: addItalic,
    Icon: Icons.italic,
  },
  {
    title: "Quote",
    handler: addQuote,
    Icon: Icons.quote,
  },
  {
    title: "Code",
    handler: addCode,
    Icon: Icons.code,
  },
  {
    title: "Code block",
    handler: addCodeBlock,
    Icon: Icons.codeBlock,
  },
  {
    title: "Link",
    handler: addLink,
    Icon: Icons.link,
  },
  {
    title: "Ordered list",
    handler: addOrderedList,
    Icon: Icons.orderedList,
  },
  {
    title: "Unordered list",
    handler: addUnorderedList,
    Icon: Icons.unorderedList,
  },
  {
    title: "Task list",
    handler: addTaskList,
    Icon: Icons.taskList,
  },
  {
    title: "Table",
    handler: addTable,
    Icon: Icons.table,
  },
];

export type Commands = typeof commands;
