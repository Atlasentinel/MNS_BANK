import SQLDAOFactory from "./SQLDaoFactory";
import JsonDAOFactory from './JsonDAOFactory';
import ClientDAO from '../ClientDAO';
import AccountDAO from '../AccountDAO';


export default abstract class DAOFactory {
    public static getDAOFactory() {
        let sql = "SQL"; 
        switch(sql) {
            case "SQL":
                return new SQLDAOFactory();
            case "JSON":
                return new JsonDAOFactory();
        }
    }
    public abstract getClientDAO(): ClientDAO;
    public abstract getAccountDAO(): AccountDAO;
}