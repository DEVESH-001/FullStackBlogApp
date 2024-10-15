const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// const bcrypt = require("bcrypt");
// const User = require('./models/User');






dotenv.config();
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");


// Middleware
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to match your frontend's origin
    allowedHeaders: ["Content-Type", "Authorization"], // Added Authorization header
  })
);

const connectWithDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected Successfully');
  } catch (error) {
    console.log('Error in connecting with Db');
    process.exit(1);
  }
};
connectWithDb();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is started at Port no ${PORT}`);
});


// Routes

// useless
app.get("/", async (req, res) => {
  res.send(`Why So Serious`);
})

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();
// const authRoutes = require("./routes/auth");
// const postRoutes = require("./routes/posts");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5174", // Adjust this to match your frontend's origin
//     allowedHeaders: ["Content-Type", "Authorization"], // Added Authorization header
//   })
// );

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);

// // Connect to MongoDB and start server
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(process.env.PORT || 8080, () =>
//       console.log(`Server running on port ${process.env.PORT || 8080}`)
//     );
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));
