const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

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
   HOME
======================================== */

app.get("/", (req, res) => {

    res.json({
        message: "SmartSam AI backend is running."
    });

});


/* ========================================
   AI CHAT
======================================== */

app.post("/api/chat", async (req, res) => {

    try {

        const { message } = req.body;


        if (!message || !message.trim()) {

            return res.status(400).json({
                error: "Message is required."
            });

        }


        console.log(
            "User:",
            message
        );


        const response =
            await client.responses.create({

                model: "gpt-5.6-luna",

                instructions: `
You are SmartSam AI.

SmartSam is an AI assistant designed to help
students, researchers, entrepreneurs, developers,
and everyday users.

Give accurate, useful and easy-to-understand answers.

When teaching:
- Explain concepts clearly.
- Give examples when useful.
- Break difficult topics into steps.

When helping with programming:
- Explain the code.
- Give practical examples.
- Help troubleshoot errors.

Be friendly, professional and helpful.
`,

                input: message

            });


        const reply =
            response.output_text;


        console.log(
            "SmartSam:",
            reply
        );


        res.json({
            reply: reply
        });


    } catch (error) {

        console.error(
            "OpenAI Error:",
            error
        );


        res.status(500).json({

            error:
                "SmartSam could not generate a response."

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