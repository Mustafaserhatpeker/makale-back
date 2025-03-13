const roles = {
  admin: "admin",
  user: "user",
};

export const getRoles = (req, res) => {
  res.json({ message: "User Roles", roles: roles });
};
