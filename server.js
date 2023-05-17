import express from "express";
import cors from "cors";
import config from "./config.json" assert { type: "json" };
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";

//express.js init and setup configurations
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

//OpenAI API init and setup configurations
const configuration = new Configuration({
  apiKey: config.API_KEY,
});
const openai = new OpenAIApi(configuration);

//main endpoint for interacting with chatGPT
app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: config.START_PROMPT },
        { role: "user", content: prompt },
      ],
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error);
    console.error(`Error!!!! ${error}`);
  }
});

//simple get endpoint for testing API
//can probably be deleted
app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello world");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//this starts the API
app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
