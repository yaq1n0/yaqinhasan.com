export type OutputLine = {
  type: "command" | "output" | "error" | "success" | "info";
  content: string;
};

export type Command = {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => void;
};

export type AddOutputFn = (type: OutputLine["type"], content: string) => void;
