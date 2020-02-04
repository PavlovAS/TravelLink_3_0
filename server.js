const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect mongoDB database
connectDB();

// Init Middleware to be able to access get.body in /api/users route
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('API running'));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/reviews', require('./routes/api/reviews'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(expree.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
