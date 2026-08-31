import type { CommandInterface } from "@/types/command.type";
import type { Command } from "commander";

interface CommandActionOptions {
  [key: string]: unknown;
}

const commandBuilder = (program: Command, command: CommandInterface): void => {
  // Create the subcommand and capture the returned Command object
  const cmd = program.command(command.name).description(command.description);

  // Add options to the subcommand
  for (const opt of command.options) {
    if (opt.required) {
      cmd.requiredOption(opt.flags, opt.description);
    } else {
      cmd.option(opt.flags, opt.description);
    }
  }

  // Attach the action to the subcommand
  cmd.action(async (options: CommandActionOptions): Promise<void> => {
    await command.action(options);
  });
};

export default commandBuilder;
