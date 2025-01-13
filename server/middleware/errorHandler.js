const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // ถ้าเป็น error จาก fetch
  if (err.name === "FetchError") {
    return res.status(503).json({
      status: "ERROR",
      message: "Service unavailable",
    });
  }

  // error ทั่วไป
  res.status(500).json({
    status: "ERROR",
    message: err.message || "Something went wrong",
  });
};

module.exports = errorHandler;
