import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header

  if (!token) {
    return res
      .status(401)
      .json({ error: "No token provided, authentication failed." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token." });
    }

    req.userId = decoded.id; // Simpan user ID dari token ke request
    next(); // Lanjutkan ke route berikutnya
  });
}
