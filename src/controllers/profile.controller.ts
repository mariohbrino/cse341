import type { Request, Response } from "express";

class ProfileController {
  index = async (request: Request, response: Response) => {
    void request;
    try {
      return response.status(200).json(request.oidc.user);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export const profileController = new ProfileController();
