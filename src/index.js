import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import logoutRoutes from "./routes/logoutRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import swaggerSpec from "../swaggerConfig.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware para servir a documentação do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para parsear JSON
app.use(bodyParser.json());

// Usando as rotas de usuários
app.use("/api/users", userRoutes);
app.use("/api/users", logoutRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
