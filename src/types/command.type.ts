type CommandInterface = {
  name: string;
  description: string;
  options: {
    flags: string;
    description: string;
    required: boolean;
  }[];
  action: (options: Record<string, unknown>) => Promise<void>;
};

export type { CommandInterface };
