require("dotenv").config();  // Load environment variables

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
    const { choice } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,  // ✅ Uses environment variable
            pass: process.env.EMAIL_PASS   // ✅ Uses environment variable
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
