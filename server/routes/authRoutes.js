// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

// Guest Login
router.get('/guest', passport.authenticate('guest'), (req, res) => {
  res.status(200).json({
    message: 'Logged in as Guest',
    user: req.user,
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
