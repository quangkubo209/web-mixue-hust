
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const connectDB = require("./src/config/mongo");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// import routers
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");
const adminRouter = require("./src/routes/admin");
const adminMangeRouter = require("./src/routes/adminProductManage");
const errorHandler = require("./src/middleware/errorHandler");

// use routers
app.use("/api/admin/products", adminMangeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

// middelware xử lý lỗi
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDB();
});

module.exports = app;
