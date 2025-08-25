import ClientDAO from "../ClientDAO";
import AccountDAO from "../AccountDAO";
import { JsonClientDAO } from "../Json/JsonClientDAO";
import { JsonAccountDAO } from "../Json/JsonAccountDAO";


export default class JsonDAOFactory{

    public getClientDAO(): ClientDAO {
        return new JsonClientDAO();
    }

    public getAccountDAO(): AccountDAO {
        return new JsonAccountDAO();
    }
}