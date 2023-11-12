import express, { Express, Request, Response } from "express";
import { getTile } from "./getTile";
import cors from "cors";

const app: Express = express();
const port = process.env.SERVER_PORT;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/tiles/:z/:x/:y.mvt", (req, res, next) => {
  return getTile(
    parseInt(req.params.z, 10),
    parseInt(req.params.x, 10),
    parseInt(req.params.y, 10)
  )
    .then((tile) => res.send(tile))
    .catch(next);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
