const roles = {
  admin: "admin",
  user: "jury",
};

export const getRoles = (req, res) => {
  res.json({ message: "Rol bilgileri getirildi.", roles: roles });
};
