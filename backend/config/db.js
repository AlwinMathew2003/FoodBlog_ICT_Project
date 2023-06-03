const mongoose = require('mongoose');

const connectToDatabase = () => {
  mongoose
    .connect("mongodb+srv://AlwinMathew:8rn7wZ1vC8WtRKea@cluster0.5g9ldqt.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = connectToDatabase;

