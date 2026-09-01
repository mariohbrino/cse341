import type { Request, Response } from "express";

class HomeController {
  index = async (_request: Request, response: Response) => {
    response.setHeader("Content-Type", "application/json");
    response.send(JSON.stringify({ message: "Hello, World!" }));
  };
}

export const homeController = new HomeController();
