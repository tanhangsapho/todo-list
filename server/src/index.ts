import "reflect-metadata";
import express from "express";
import { run } from "./utils/server";
import router from "./routes/todo.route";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", router);

run();
