import express from 'express';
import ClientController from './Controller/ClientController'; // adapte le chemin

const app = express();
const PORT = 3200;

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World en TypeScript!');
// });

const clientController = new ClientController();
app.use('/', clientController.router);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});