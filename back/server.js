import express, { json } from "express";
import cors from "cors";
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const users = [
  {
    id: 1,
    name: "Ahmet",
    email: "a@gmail.com",
  },
  {
    id: 2,
    name: "Mehmet",
    email: "m@gmail.com",
  },
];

// Basit bir test endpointi
app.get("/merhaba", (req, res) => {
  res.send(users);
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
