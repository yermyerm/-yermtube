import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("users/join", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Create Account";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
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
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const getEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const pageTitle = "Edit Profile";
  const {
    session: { user },
    body: { name, email, username, location },
    file,
  } = req;
  console.log(path);
  let searchParam = [];

  if (user.username !== username) {
    searchParam.push({ username });
  }
  if (user.email !== email) {
    searchParam.push({ email });
  }
  if (searchParam.length > 0) {
    const userExists = await User.findOne({ $or: searchParam });
    if (userExists && userExists._id.toString() !== user._id) {
      return res.status(400).render("edit-profile", {
        pageTitle,
        errorMessage: "This username/email is already taken.",
      });
    }
  }
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const pageTitle = "Change Password";
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  if (newPassword !== newPassword2) {
    return res.status(400).render("users/change-password", {
      pageTitle,
      errorMessage: "Password Confirmation does not match.",
    });
  }
  if (!(await bcrypt.compare(oldPassword, password))) {
    return res.status(400).render("users/change-password", {
      pageTitle,
      errorMessage: "The current password is incorrect.",
    });
  }
  const user = await User.findById(_id);
  user.password = newPassword;
  await user.save();
  req.session.user.password = user.password;
  return res.redirect("/logout");
};

export const deleteUser = (req, res) => res.send("Delete User");

export const getLogin = (req, res) =>
  res.render("users/login", { pageTitle: "Log In" });
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "This username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.user = undefined;
  return res.redirect("/");
};
export const see = (req, res) => res.send("See User");
