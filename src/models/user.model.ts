import type { InferSchemaType } from "mongoose";

import { UserSchema } from "@/schemas/user.schema";
import { databaseService } from "@/services/database.service";

export type UserData = InferSchemaType<typeof UserSchema>;
export type UserDocument = InstanceType<typeof UserModel>;

export const UserModel = databaseService.connection.model("Users", UserSchema);

export const getAllUsers = async (): Promise<UserDocument[]> => {
  const users = await UserModel.find();
  return users;
};

export const findUserById = async (id: string): Promise<UserDocument | null> => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createUser = async (userData: UserData) => {
  try {
    const createdUser = await UserModel.findOneAndUpdate(
      { email: userData.email },
      { $setOnInsert: userData },
      { returnDocument: "after", upsert: true, runValidators: true },
    );
    console.log("User created:", createdUser);
    return createdUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUser = async (id: string, updatedData: Partial<UserData>): Promise<UserDocument | null> => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found.`);
    }
    console.log("User updated:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteUser = async (id: string): Promise<UserDocument | null> => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error(`User with id ${id} not found.`);
    }
    console.log("User deleted:", deletedUser);
    return deletedUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};
