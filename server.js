const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Set up session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  })
);

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    // User is authenticated
    next();
  } else {
    // User is not authenticated, redirect to login
    res.redirect('/login');
  }
};

// Define a route for user registration
app.post('/register', (req, res) => {
  // Registration logic
  // ...

  res.redirect('/login');
});

// Define a route for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check username and password (you can customize this logic)
  if (username === 'admin' && password === 'admin') {
    // Store user data in session
    req.session.user = {
      username: username
    };
    res.redirect('/dashboard');
  } else {
    // Invalid credentials, redirect back to login
    res.redirect('/login');
  }
});

// Define a route for user logout
app.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy();
  res.redirect('/login');
});

// Protected route for the dashboard
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send(`Welcome, ${req.session.user.username}! This is your dashboard.`);
});

// Define a route for the login page
app.get('/login', (req, res) => {
  // Render the login form
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="post">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
