import { Client } from '../../Model/Client';
import { Account } from '../../Model/Account';
import AccountDAO from '../AccountDAO';

export class JsonAccountDAO implements AccountDAO {

    public async create(item: Account): Promise<String> {
        // TODO: implement create        
        // // return idC;
        return "Client created successfully";
    }
    public async update(cli: Account): Promise<boolean> {
        // TODO: implement update
        return true;
    }
    public async delete(id: number): Promise<String> {
        // TODO: implement delete
        return "Client deleted successfully";
    }
    public async findAll(): Promise<Account[]> {
        return [];
    }

    public async findById(id: number): Promise<Account> {
        // TODO: implement findById
        return new Account(1, 1, 1000.00);
    }


}