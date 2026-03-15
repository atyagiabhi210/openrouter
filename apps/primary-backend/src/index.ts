import express, { type Request, type Response } from "express";
import swaggerUi from "swagger-ui-express";
import router from "./routes";
import swaggerSpec from "./swagger";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Server is running!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

/*
  Routes that needs to be built
  auth ==> sign in and sign up
  api key ==> create, delete, get , disable 
  model ==> get all supported models, pricing, providers etc
  payment ==> rzp and stripe integration
*/
