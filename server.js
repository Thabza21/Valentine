
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Route to send emails
app.post("/send-email", async (req, res) => {
    const { choice } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Response to your Valentine's application",
        text: `They said: ${choice}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Email sent successfully! ✅");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email ❌");
    }
});

// Ensure the main page is served
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

