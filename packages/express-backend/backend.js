// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);


const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUser = (user) => {
  const index = users["users_list"].indexOf(user);
  users["users_list"].splice(index, 1);
};

app.use(cors());
app.use(express.json());


app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    deleteUser(id);
    res.status(204).send();
  }
});

app.post("/users", (req, res) => {
  let id = String(Math.floor(Math.random() * 1000))
  let userToAdd = {
    id: id,
    name: String(req.body.name),
    job: String(req.body.job)};
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

