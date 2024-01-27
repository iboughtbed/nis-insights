import {
  AvatarIcon,
  GitHubLogoIcon,
  ImageIcon,
  InstagramLogoIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  LucideBold,
  LucideCode,
  LucideCodeSquare,
  LucideHeading,
  LucideItalic,
  LucideLink,
  LucideList,
  LucideListOrdered,
  LucideListTodo,
  LucideLoader2,
  LucideRedo2,
  LucideTable,
  LucideTextQuote,
  LucideUndo2,
} from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  instagram: InstagramLogoIcon,
  gitHub: GitHubLogoIcon,
  spinner: LucideLoader2,
  avatar: AvatarIcon,
  placeholder: ImageIcon,
  questionMark: QuestionMarkCircledIcon,
  undo: LucideUndo2,
  redo: LucideRedo2,
  heading: LucideHeading,
  bold: LucideBold,
  italic: LucideItalic,
  quote: LucideTextQuote,
  code: LucideCode,
  codeBlock: LucideCodeSquare,
  link: LucideLink,
  orderedList: LucideListOrdered,
  unorderedList: LucideList,
  taskList: LucideListTodo,
  table: LucideTable,
};
