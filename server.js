const express = require("express");
const cookieParser = require("cookie-parser");
const csrfMiddleware = require("./middlewares/csrfProtection");
const path = require("path");

const app = express();
const PORT = 5001;

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "assets")));

app.get("/", csrfMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "form.html"));
});

app.post("/api/submit-form", csrfMiddleware, (req, res) => {
    const {username} = req.body;
    console.log("Received username: ",username);
    res.json({ message: "Form submitted successfully!" });
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});