// src/api/connection.js

const BASE_URL = "http://localhost:8000/api"; 

// ========== USER AUTH ROUTES ==========

// Register user
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include", // Needed to handle cookies
    });
    return await res.json();
  } catch (err) {
    console.error("Register Error:", err);
    throw err;
  }
};

// Login user
export const loginUser = async (loginData) => {
  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Logout Error:", err);
    throw err;
  }
};

// Delete user
export const deleteUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users/delete`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Delete User Error:", err);
    throw err;
  }
};

// ========== SWAP ROUTES ==========

// Create a swap request
export const createSwap = async (swapData) => {
  try {
    const res = await fetch(`${BASE_URL}/swaps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(swapData),
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Create Swap Error:", err);
    throw err;
  }
};

// Get all swaps for logged-in user
export const getMySwaps = async () => {
  try {
    const res = await fetch(`${BASE_URL}/swaps/my-swaps`, {
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Fetch My Swaps Error:", err);
    throw err;
  }
};

// Update swap status
export const updateSwapStatus = async (id, action) => {
  try {
    const res = await fetch(`${BASE_URL}/swaps/${id}/${action}`, {
      method: "PATCH",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(`Swap ${action} Error:`, err);
    throw err;
  }
};

// Cancel a swap
export const cancelSwap = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/swaps/${id}/cancel`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Cancel Swap Error:", err);
    throw err;
  }
};

// ========== FEEDBACK ROUTES ==========

// Create feedback
export const createFeedback = async (feedbackData) => {
  try {
    const res = await fetch(`${BASE_URL}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedbackData),
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Create Feedback Error:", err);
    throw err;
  }
};

// Get feedback for a user
export const getUserFeedback = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/feedback/${userId}`);
    return await res.json();
  } catch (err) {
    console.error("Fetch User Feedback Error:", err);
    throw err;
  }
};

// Get all feedbacks (admin)
export const getAllFeedbacks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/feedback`, {
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Fetch All Feedbacks Error:", err);
    throw err;
  }
};