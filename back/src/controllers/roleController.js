const roles = {
  admin: "admin",
  user: "user",
};

export const getRoles = (req, res) => {
  res.json({ message: "Rol bilgileri getirildi.", roles: roles });
};
