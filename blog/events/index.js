const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // Sends Event Posts Service
  // Localhost
  // axios.post("http://localhost:4000/events", event).catch((err) => {
  //   console.log(err.message);
  // });
  // Post to K8s
    axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
      console.log(err.message);
    });

  // // Sends Event Comments Service
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  // // Sends Event Query Service
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  // // Sends Event Moderation Service
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});