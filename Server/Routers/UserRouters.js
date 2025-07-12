const express = require("express");
const {
  createuserHandle,
  loginuserHandler,
  deleteuserHandle,
  userlogoutHandle,
} = require("../controllers/controllers");
const {checkSession}=require('../services/middleware')
const Userrouter = express.Router();

// USERS AUTH ROUTERS
Userrouter.post("/register", createuserHandle);
Userrouter.post("/login", loginuserHandler);
Userrouter.post('user/logout',checkSession,userlogoutHandle)
Userrouter.delete("/delete", checkSession, deleteuserHandle);

module.exports = Userrouter;