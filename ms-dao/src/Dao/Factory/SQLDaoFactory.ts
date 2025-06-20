import ClientDAO from "../ClientDAO"
import AccountDAO from "../AccountDAO"

import { SQLClientDAO } from "../SQL/SQLClientDAO";
import { SQLAccountDAO } from "../SQL/SQLAccountDAO";


export default class SQLDAOFactory{

    public getClientDAO(): ClientDAO {
        return new SQLClientDAO();
    }

    public getAccountDAO(): AccountDAO {
        return new SQLAccountDAO();
    }
}