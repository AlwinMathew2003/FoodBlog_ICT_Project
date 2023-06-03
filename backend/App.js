const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const connectToDatabase = require('./config/db');
const User = require("./models/User");
const bcrypt = require('bcrypt');

connectToDatabase();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use((req, res, next) => {
  const isAdmin = req.user && req.user.isAdmin;
  if (isAdmin) {
    req.user.isAdmin = true;
  }
  next();
});

// REGISTER ADMIN USER
const registerAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash("adminpassword", salt);
      const adminUser = new User({
        username: "admin",
        email: "admin@example.com",
        password: hashedPass,
        isAdmin: true,
      });
      await adminUser.save();
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (err) {
    console.log(err);
  }
};

// Check if admin user already exists before registering
User.findOne({ email: "admin@example.com" })
  .then((existingAdmin) => {
    if (!existingAdmin) {
      registerAdminUser();
    } else {
      console.log("Admin user already exists");
    }
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
