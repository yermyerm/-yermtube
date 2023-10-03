import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
  const { name, email, username, password, location } = req.body;
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};
export const edit = (req, res) => res.send("Edit User");
export const deleteUser = (req, res) => res.send("Delete User");
export const login = (req, res) => res.render("login", { pageTitle: "Log In" });
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
