import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

export default class App {
  public app: Application;

  constructor(private buildPath: string) {
    this.app = express();
  }

  public setup() {
    this.setupMiddleware();
    this.serveClientFile();
    this.renderDefaultHtml();
  }

  public setupMiddleware() {
    this.app.use(express.json());
  }

  public serveClientFile() {
    this.app.use(express.static(this.buildPath));
  }

  public renderDefaultHtml() {
    /**
     * For any route serve index.html,
     * react-router will navigate it to appropriate page 
     */
    this.app.use('/', (req: Request, res: Response) => {
      res.status(200)
          .sendFile(path.join(this.buildPath, '/index.html'));
    });
  }
}
