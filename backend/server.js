require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

const PORT = 5000;


/* ========================================
   OPENAI
======================================== */

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


/* ========================================
   MIDDLEWARE
======================================== */

app.use(cors());

app.use(express.json());


/* ========================================
   HOME ROUTE
======================================== */

app.get("/", (req, res) => {

    res.json({
        message: "SmartSam AI backend is running."
    });

});


/* ========================================
   CHAT ROUTE
======================================== */

app.post("/api/chat", async (req, res) => {

    const { message } = req.body;


    if (!message) {

        return res.status(400).json({
            error: "Message is required."
        });

    }


    console.log(
        "Message received:",
        message
    );


    try {

        const response = await client.responses.create({

            model: "gpt-5-mini",

            instructions:
                "You are SmartSam AI, a helpful and accurate AI assistant for students, researchers, entrepreneurs and everyday users. Explain difficult topics clearly and simply when appropriate.",

            input: message

        });


        res.json({

            reply: response.output_text

        });


    } catch (error) {

        console.error(
            "OpenAI error:",
            error
        );


        res.status(500).json({

            error:
                "SmartSam AI could not generate a response right now."

        });

    }

});


/* ========================================
   START SERVER
======================================== */

app.listen(PORT, () => {

    console.log(
        `SmartSam AI backend running at http://localhost:${PORT}`
    );

});