const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const members = require('./Members');
// const logger = require('./middleware/logger');

const app = express();

// Init middleware
// app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set a static folder
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members,
  })
);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Members APIs route
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
