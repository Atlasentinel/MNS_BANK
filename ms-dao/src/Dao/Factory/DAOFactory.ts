import SQLDAOFactory from "./SQLDAOFactory";
import JsonDAOFactory from './JsonDAOFactory';
import ClientDAO from '../ClientDAO';
import AccountDAO from '../AccountDAO';


export default abstract class DAOFactory {
    public static getDAOFactory() {
        // On force l'utilisation de SQL pour l'instant et pour les tests
        // Pour autant la logique JSON si elle est implémentée, peut être utilisée parfaitement
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