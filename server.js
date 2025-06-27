// 27-06-2025 | Mark K. | server.js aangemaakt

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const multer = require('multer');
const upload = multer();
const PORT = process.env.PORT || 5000;

app.post("/submit", upload.none(), (req, res) => {
    console.log("Formulierdata ontvangen:", req.body);
    res.json({ message: "Data ontvangen!" });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server draait op poort ${PORT}`);
});
