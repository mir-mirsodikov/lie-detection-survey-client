import * as http from 'http';
import path from 'path';
import App from './App';

function main() {
  const buildPath = path.join(__dirname, '../../dist');

  const app = new App(buildPath);
  app.setup();

  const server = http.createServer(app.app);
  const port = process.env.PORT ?? 3000;
  server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

main();