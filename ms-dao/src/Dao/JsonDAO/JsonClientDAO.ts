import { Client } from '../../Model/Client';
import ClientDAO from '../ClientDAO';

export class JsonClientDAO implements ClientDAO {
    public async create(cli: Client): Promise<String> {
        // TODO: implement create
        // return idC;
        return "Client created successfully";
        
    }

    public async update(cli: Client): Promise<boolean> {
        // TODO: implement update
        return true;
    }
    public async delete(id: number): Promise<String> {
        // TODO: implement delete
        return "Client deleted successfully";
    }
    public async findAll(): Promise<Client[]> {
        // TODO: implement findAll
        return [];
    }

    public async findById(id: number): Promise<Client> {
        // TODO: implement findById
        return new Client(1,"test", "test", "test", "test");
    }


}