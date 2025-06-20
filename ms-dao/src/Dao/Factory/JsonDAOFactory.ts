import ClientDAO from "../ClientDAO";
import AccountDAO from "../AccountDAO";
import { JsonClientDAO } from "../JsonDAO/JsonClientDAO";
import { JsonAccountDAO } from "../JsonDAO/JsonAccountDAO";


export default class JsonDAOFactory{

    public getClientDAO(): ClientDAO {
        return new JsonClientDAO();
    }

    public getAccountDAO(): AccountDAO {
        return new JsonAccountDAO();
    }
}