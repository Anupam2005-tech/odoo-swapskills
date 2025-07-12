const express = require("express");
const {
  createuserHandle,
  loginuserHandler,
  deleteuserHandle,
  userlogoutHandle,
} = require("../controllers/usercontroller");
const {checkSession}=require('../services/middleware')
const Userrouter = express.Router();

// USERS AUTH ROUTERS
Userrouter.post("/register", createuserHandle);
Userrouter.post("/login", loginuserHandler);
Userrouter.post('/logout', checkSession, userlogoutHandle);
Userrouter.delete("/delete", checkSession, deleteuserHandle);

module.exports = Userrouter;