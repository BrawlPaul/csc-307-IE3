// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import mongoose from "mongoose";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userService.deleteUser(id)
    .then((result) => {
      res.send(result);
    }).catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    })
});

app.post("/users", (req, res) => {
  //let id = String(Math.floor(Math.random() * 1000))
  let userToAdd = {
    name: req.body.name,
    job: req.body.job};
  userService.addUser(userToAdd)
    .then((result) => {
      res.status(201).send(result);
    }).catch((error) => {
      res.status(500).send("Internal Server Error");
      console.log(error);
    })
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userService.getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    }).catch((error) => {
      res.status(500).send("Internal Server Error");
      console.log(error);
    })
});





app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userService.findUserById(id)
    .then((result) => {
      res.send(result);
    }).catch((error) => {
      res.status(500).send("Internal Server Error");
      console.log(error);
    })
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

