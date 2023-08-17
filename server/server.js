const express = require("express");
const path = require('path');
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

// const imagePath = path.join(__dirname, 'uploads');
// app.use('/images', express.static(imagePath));

// Cấu hình express.static để phục vụ tệp tĩnh từ thư mục uploads
const uploadPath = 'C:/Users/Admin/OneDrive - Hanoi University of Science and Technology/Documents/Project-softwareEngineer/web-mixue-hust/server/uploads';
app.use('/uploads', express.static(uploadPath));

// import routers
const userRouter = require("./src/routes/user");
// const productRouter = require("./src/routes/product1");
const adminMangeRouter = require("./src/routes/product");
const errorHandler = require("./src/middleware/errorHandler");

// use routers
app.use("/api/admin/products", adminMangeRouter);
// app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
// app.use("/api/products", productRouter);

// middelware xử lý lỗi
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDB();
});

module.exports = app;
