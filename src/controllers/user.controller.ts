import type { Request, Response } from "express";
import { z } from "zod";

import type { UserData } from "@/models/user.model";
import { createUser, deleteUser, findUserById, getAllUsers, updateUser } from "@/models/user.model";

class UserController {
  createSchema = z.object({
    body: z.object({
      firstName: z.string().nonempty("First name cannot be empty"),
      lastName: z.string().nonempty("Last name cannot be empty"),
      email: z.email().nonempty("Email cannot be empty"),
    }) satisfies z.ZodType<Omit<UserData, "status">>,
  });

  index = async (_request: Request, response: Response) => {
    try {
      const users = await getAllUsers();

      return response.status(200).json(users);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while fetching users." });
    }
  };

  show = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { id } = request.params;
      const userId = typeof id === "string" ? id.trim() : undefined;

      if (!userId) {
        return response.status(400).json({ message: "User ID is required." });
      }

      const user = await findUserById(userId as string);

      if (!user) {
        return response.status(404).json({ message: "Cannot find user." });
      }
      return response.status(200).json(user);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while fetching the user." });
    }
  };

  create = async (request: Request, response: Response): Promise<Response> => {
    try {
      const userData: UserData = request.body;
      const newUser = await createUser(userData);
      if (!newUser) {
        return response.status(400).json({ message: "Invalid request payload" });
      }
      return response.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while creating the user." });
    }
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { id } = request.params;
      const userId = typeof id === "string" ? id.trim() : undefined;

      if (!userId) {
        return response.status(400).json({ message: "User ID is required." });
      }

      const userData: UserData = request.body;
      const updatedUser = await updateUser(userId as string, userData);
      if (!updatedUser) {
        return response.status(404).json({ message: "Cannot find user." });
      }
      return response.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while updating the user." });
    }
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { id } = request.params;
      const userId = typeof id === "string" ? id.trim() : undefined;

      if (!userId) {
        return response.status(400).json({ message: "User ID is required." });
      }

      const deletedUser = await deleteUser(userId as string);

      if (!deletedUser) {
        return response.status(404).json({ message: "Cannot find user." });
      }
      return response.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while deleting the user." });
    }
  };
}

export const userController = new UserController();
