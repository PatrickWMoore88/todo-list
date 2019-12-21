const express = require("express");
const app = express();
const session = require("express-session");
const accountRouter = require("./routes/account");
const models = require("./models");
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");

app.use(
  session({
    secret: "La li lu le lo",
    resave: false,
    saveUninitialized: true
  })
);
app.use("/account", accountRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users", function(req, res) {
  console.log("Querying Users");
  models.user.findAll().then(function(user) {
    console.log(user);
    res.send(user);
  });
});

app.get("/tasks", function(req, res) {
  console.log("Querying Tasks");
  models.task.findAll().then(function(task) {
    console.log(task);
    res.send(task);
  });
});

app.post("/users", function(req, res) {
  console.log("creating user");
  console.log(req.body);
  var newUser = req.body.name;
  console.log(newUser);
  if (newUser) {
    models.user
      .create({
        name: req.body.name
      })
      .then(function(user) {
        console.log(user.name + " was added to the Database");
        res.send(
          "New User " + user.name + " Was Created with the ID of: " + user.id
        );
      });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    let userName = await models.user.findOne({
      where: { id: req.body.user_id }
    });
    console.log("creating artist");
    console.log(req.body);
    models.task
      .create({
        name: req.body.name,
        completed: req.body.completed,
        user_id: req.body.user_id
      })
      .then(function(task) {
        res.send(
          "New Task was Assigned to " +
            userName.name +
            " and was Created with the ID of: " +
            task.id
        );
      });
  } catch (e) {
    res.send(e);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    let user = await models.user.findOne({
      where: { id: req.params.id }
    });
    let oldName = user.dataValues.name;
    console.log("Updating User " + oldName + " to " + req.body.name);
    let updateValues = {};
    updateValues.name = req.body.name;
    console.log(updateValues.name);
    models.user
      .update(updateValues, { where: { id: req.params.id } })
      .then(function(updated) {
        console.log("User Update Successful");
        console.log(updated);
        res.send(updated);
      });
  } catch (e) {
    res.send(e);
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    let task = await models.task.findOne({
      where: { id: req.params.id }
    });
    let completed = task.dataValues.completed;
    console.log("updating task: " + req.params.id);
    let updateValues = {};
    if (completed === false) {
      updateValues.completed = req.body.completed;
      console.log(updateValues.completed);
    }
    models.task
      .update(updateValues, { where: { id: req.params.id } })
      .then(function(updated) {
        console.log("Update Successful");
        console.log(updated);
        res.send(updated);
      });
  } catch (e) {
    res.send(e);
  }
});

app.delete("/users/:id", function(req, res) {
  models.user.destroy({ where: { id: req.params.id } }).then(function() {
    res.send("User was Deleted Successful");
  });
});

app.delete("/tasks/:id", function(req, res) {
  models.task.destroy({ where: { id: req.params.id } }).then(function() {
    res.send("Task Deleted Successful");
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});

// app.get("/registration", function(req, res) {
//   res.render("registration");
// });

// app.post("/registerUser", async (req, res) => {
//   try {
//     let registeredUser = await models.user.findOne({
//       where: { name: req.body.name }
//     });
//     console.log(registeredUser)
//     if (registeredUser) {
//       throw new Error("Sorry Please try a different user_name.");
//     }
//     let encrypted = bcrypt.hashSync(req.body.password, 10);
//     models.user.create({
//       name: req.body.name,
//       password: encrypted
//     });
//   } catch (e) {
//     res.send(e);
//   }
//   res.redirect("/login?registeredSuccessfully=true");
// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.post("/loginUser", async (req, res) => {
//   try {
//     let dbUser = await models.user.findOne({
//       where: {name: req.body.name }
//     });
//     if (!dbUser) throw new Error("Sorry Try Again!");
//     bcrypt.compare(req.body.password, dbUser.password, (err, same) => {
//       if (err) throw err;
//       if (!same) throw new Error("Nope! Try A Different Password");
//       req.session.id = dbUser.id;
//       res.redirect("/account/dashboard");
//     });
//   } catch (e) {
//     res.send(e);
//   }
// });
