const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to make requests

app.post("/send-email", async (req, res) => {
    const { choice } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "thabzagta5@gmail.com", // Replace with your email
            pass: "mqsu hqsc blzo yqtr" // Replace with an app password (not your email password)
        }
    });

    let mailOptions = {
        from: "thabzagta5@gmail.com",
        to: "thabzagta5@gmail.com",
        subject: "Response to your Valentine's application",
        text: `She said ${choice}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Email sent successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
