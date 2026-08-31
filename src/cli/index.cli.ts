import { Command } from "commander";

import commandBuilder from "@/cli/builder.cli";
import { seedProfessional } from "@/cli/commands/seed-professional.command";

const program = new Command();

program
  .name("cli")
  .description("A simple CLI tool for managing the API")
  .action(() => {
    program.help();
  });

commandBuilder(program, seedProfessional);

program.parse();
