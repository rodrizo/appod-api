import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

//some middlewares
app.use(express.json());
app.use(cors());

//middleware in order to controle error paths
app.use((req, res, next) => {
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hola" });
});

let pictures = [
  {
    id: 1,
    name: "Andromeda Picture",
    date: "2019-05-15",
    url: "https://andromeda.com",
    explanation: "A great image of Andromeda",
  },
  {
    id: 2,
    name: "Mars Picture",
    date: "2012-05-15",
    url: "https://mars.com",
    explanation: "A great image of Mars",
  },
];

//GET
app.get("/api/picture", (req, res) => {
  res.json(pictures);
});

//GET {id}
app.get("/api/picture/:id", (req, res) => {
  const id = Number(req.params.id);
  const pic = pictures.find((t) => t.id === id);
  if (pic) {
    res.json(pic);
  } else {
    response.status(404).end();
  }
});

//DELETE {id}
app.delete("/api/picture/:id", (req, res) => {
  const id = Number(req.params.id);
  pictures = pictures.filter((pic) => pic.id !== id);
  res.status(204).end();
});

//POST
app.post("/api/picture", (req, res) => {
  const pic = req.body;

  if (!pic || pic.date) {
    return res.status(400).json({
      error: "date is missing",
    });
  }

  const ids = pictures.map((pic) => pic.id);
  const maxId = Math.max(...ids);

  const newPic = {
    id: maxId + 1,
    ...pic,
  };

  pictures = [...pictures, newPic];

  res.status(201).json(newPic);
});

//PUT
app.put("/api/picture/:id", (req, res) => {
  const id = Number(req.params.id);
  const pic = pictures.find((p) => t.id === id);

  if (pic) {
    pictures = pictures.map((p) =>
      String(t.id) === id ? { ...p, ...req.body } : p
    );
    res.json(pictures.find((p) => t.id === id));
  } else {
    res.json(null);
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not found :(",
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
