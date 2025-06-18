const express = require('express');
const app = express();
const port = 3000;
const clientsRoutes = require('./routes/clientsRoutes');

app.use(express.json());

// Routes
app.use('/api', clientsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
