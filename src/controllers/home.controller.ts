import type { Request, Response } from "express";

class HomeController {
  index = async (_request: Request, response: Response) => {
    response.send("Hello, World!");
  };
}

export const homeController = new HomeController();
