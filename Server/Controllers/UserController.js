const User = require('../Models/UserSchema'); 
const { setUser, getUser } = require('../Services/Cookies');
const { checkHashPassword, hashedPassword } = require('../Services/HashPassword');

// Create User (Register)
async function createuserHandle(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required!" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ msg: "User already exists." });
    }

    const hashedpasswordValue = await hashedPassword(password);

    await User.create({
      name,
      email,
      password: hashedpasswordValue,
    });

    return res.status(201).json({ msg: "Account created successfully!" });
  } catch (err) {
    console.error("Create User Error:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

// Login User
async function loginuserHandler(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required." });
    }

    const userQuery = await User.findOne({ email });
    if (!userQuery) {
      return res.status(401).json({ msg: "Invalid email or password." });
    }

    const passwordMatch = await checkHashPassword(password, userQuery.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid email or password." });
    }

    const token = setUser(userQuery);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,    
      maxAge: 48 * 60 * 60 * 1000, 
    });

    return res.status(200).json({ msg: "Login successful" });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ msg: "Some error occurred while logging in" });
  }
}

// Delete User
async function deleteuserHandle(req, res) {
  try {
    const userToken = req.cookies.token;
    if (!userToken) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    const checkUser = getUser(userToken);
    if (!checkUser || !checkUser.email) {
      return res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }

    const { email } = checkUser;
    const userQuery = await User.findOneAndDelete({ email });

    if (!userQuery) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    return res.status(200).json({ msg: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    return res.status(500).json({ msg: "Some error occurred while deleting user" });
  }
}

// Logout User
async function userlogoutHandle(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ msg: "No token to log out" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ msg: "Some error occurred while logging out" });
  }
}

module.exports = {
  createuserHandle,
  loginuserHandler,
  deleteuserHandle,
  userlogoutHandle,
};