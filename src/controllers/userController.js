import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
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
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const pageTitle = "Edit Profile";
  const {
    session: { user },
    body: { name, email, username, location },
  } = req;

  const userUpdate = async (user, name, email, username, location) => {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name,
        email,
        username,
        location,
      },
      { new: true }
    );
    req.session.user = updatedUser;
  };
  // const check = async (username, email) => {
  //   console.log("Check was called!!!!");
  //   try {
  //     const exists = await User.exists({ $or: [{ username }, { email }] });
  //     if (exists) {
  //       console.log("already taken detected!!!!");
  //       return res.status(400).render("edit-profile", {
  //         pageTitle,
  //         errorMessage: `This username or email is already taken.`,
  //       });
  //     }
  //   } catch (error) {
  //     return res
  //       .status(400)
  //       .render("edit-profile", { pageTitle, errorMessage: error._message });
  //   }
  // };
  if (user.username !== username || user.email !== email) {
    const usernameExists = await findOne({ username });
    const emailExists = await findOne({ email });
    if (usernameExists || emailExists) {
      if (usernameExists._id === user._id && emailExists._id === user._id) {
        userUpdate(user, name, email, username, location);
      } else {
        return res.status(400).render("edit-profile", {
          pageTitle,
          errorMessage: `This username or email is already taken.`,
        });
      }
    }
  } else {
    userUpdate(user, name, email, username, location);
  }
  return res.redirect("/users/edit");
};

export const deleteUser = (req, res) => res.send("Delete User");

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "This username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
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
