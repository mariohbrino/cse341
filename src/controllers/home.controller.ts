import type { Request, Response } from "express";

class HomeController {
  index = async (request: Request, response: Response) => {
    void request;
    try {
      return response.json({ message: "Hello, World!" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  };

  invalid = async (request: Request, response: Response) => {
    void request;
    try {
      throw new Error("Something went wrong");
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Something went wrong" });
    }
  };
}

export const homeController = new HomeController();
