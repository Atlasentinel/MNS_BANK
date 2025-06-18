const express = require('express');
const app = express();
const port = 3000;
const clientsRoutes = require('./controller/ClientController');
const banksRoutes = require('./controller/BankController');
const accountsRoutes = require('./controller/AccountController');

app.use(express.json());

// Routes
app.use('/api', clientsRoutes);
app.use('/api', banksRoutes);
app.use('/api', accountsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
