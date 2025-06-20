import { Account} from './Account';
export class Client {
    numberClient: number;
    address: string;
    name: string;
    account: Account;


    constructor(numberClient: number, address: string, name: string, account: Account) {
        this.numberClient = numberClient;
        this.address = address;
        this.name = name;
        this.account = account;
    }
}