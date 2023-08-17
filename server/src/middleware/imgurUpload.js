const axios = require("axios");
const FormData = require("form-data");
const ApiError = require("../utils/apiError");
require("dotenv").config();

const imgurUploadImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    if (!req.file.buffer) {
      throw new ApiError(400, "Missing file buffer");
    }
    const formData = new FormData();
    formData.append("image", req.file.buffer);

    const response = await axios.post(
      "https://api.imgur.com/3/image",
      formData,
      {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          ...formData.getHeaders(),
        },
      }
    );
    // const base64String = req.file.buffer.toString("base64");
    // formData.append("image", base64String);

    // const config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "https://api.imgur.com/3/image",
    //   headers: {
    //     Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    //     ...formData.getHeaders(),
    //   },
    //   data: formData,
    // };

    // const response = await axios(config);
    if (response.data && response.data.data && response.data.data.link) {
      req.body.image = response.data.data.link;
      next();
    } else {
      throw new ApiError(500, "Failed to upload to Imgur");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = imgurUploadImage;
