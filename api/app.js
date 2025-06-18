const express = require('express');
const app = express();
const port = 3000;
const clientsRoutes = require('./routes/clientsRoutes');
const banksRoutes = require('./routes/banksRoutes');
const accountsRoutes = require('./routes/accountsRoutes');

app.use(express.json());

// Routes
app.use('/api', clientsRoutes);
app.use('/api', banksRoutes);
app.use('/api', accountsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
