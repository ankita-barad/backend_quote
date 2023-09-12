require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Replace 'YOUR_OPENAI_API_KEY' with your actual API key.
const apiKey = process.env.OPENAI_API_KEY;

// Define a route to generate quotes based on a keyword.
app.post("/generate-quote", async (req, res) => {
  const { keyword } = req.body;

  try {
    // Make a request to the OpenAI API.
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      {
        prompt: `Generate a quote about ${keyword}`,
        max_tokens: 30, // You can adjust this to control the length of the generated quote.
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const quote = response.data.choices[0].text;
    res.json({ quote });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the quote." });
  }
});

// Start the server.
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
