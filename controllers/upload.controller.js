export function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload an image" });
  }

  return res.status(200).json({
    message: "Image uploaded successfully",
    file: req.file,
  });
}
