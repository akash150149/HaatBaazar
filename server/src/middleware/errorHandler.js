export function notFoundHandler(req, res) {
  res.status(404).json({ message: "Route not found" });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err?.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "Image size must be 5MB or less" });
    }
    return res.status(400).json({ message: err.message || "File upload error" });
  }
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Internal server error" });
}
