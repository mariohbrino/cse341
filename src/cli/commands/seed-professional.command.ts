import type { CommandInterface } from "@/types/command.type";

import { seedProfessionalAction } from "@/cli/actions/seed-professional.action";
import { databaseService } from "@/services/database.service";

const seedProfessional: CommandInterface = {
  name: "seed:professional",
  description: "Seed a professional into the database",
  options: [],
  action: async () => {
    await databaseService.connect();

    try {
      await seedProfessionalAction();
    } finally {
      await databaseService.disconnect();
    }
  },
};

export { seedProfessional };
