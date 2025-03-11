import express, { json } from "express";
const app = express();
const port = 3000;

app.use(express.json());

// Basit bir test endpointi
app.get("/", (req, res) => {
  res.send("Merhaba, Express API çalışıyor!");
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
