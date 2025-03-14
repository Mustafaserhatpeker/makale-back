import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Erişim reddedildi, giriş anahtarınız yok." });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Geçersiz erişim anahtarı." });
  }
};

const adminMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Erişim reddedildi, giriş anahtarınız yok." });
  }
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    if (decoded.userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Erişim Reddedildi,yetkisiz erişim." });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Erişim Reddedildi,geçersiz erişim anahtarı." });
  }
  next();
};

export { authMiddleware, adminMiddleware };
