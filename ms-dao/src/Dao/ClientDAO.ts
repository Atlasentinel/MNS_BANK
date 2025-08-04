import { Client } from '../Model/Client';

import IDAO from './IDAO';

export default interface ClientDAO extends IDAO<Client> {
    // Ajouter des méthodes spécifiques à ClientDAO si nécessaire
    // Par exemple, une méthode pour trouver un client par son login
    findByLoginAndPassword(login: string, password: string): Promise<Client | null>;
}