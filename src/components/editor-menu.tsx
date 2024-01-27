"use client";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { commands, type Commands } from "~/config/editor";

interface EditorMenuProps {
  onCommand: (command: Commands[number]["title"]) => void;
  handleUndo: () => void;
  handleRedo: () => void;
}

export function EditorMenu({
  onCommand,
  handleUndo,
  handleRedo,
}: EditorMenuProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 py-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            className="text-foreground/80"
            variant="outline"
            size="icon"
            onClick={handleUndo}
          >
            <Icons.undo className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Undo</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            className="text-foreground/80"
            variant="outline"
            size="icon"
            onClick={handleRedo}
          >
            <Icons.redo className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Redo</p>
        </TooltipContent>
      </Tooltip>

      {commands.map((cmd, k) => (
        <Tooltip key={k}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              className="text-foreground/80"
              variant="outline"
              size="icon"
              onClick={() => onCommand(cmd.title)}
            >
              <cmd.Icon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{cmd.title}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
