import express from "express";
import cors from "cors";
import config from "./config.json" assert { type: "json" };
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";

const configuration = new Configuration({
  apiKey: config.API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
});

app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello world");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
