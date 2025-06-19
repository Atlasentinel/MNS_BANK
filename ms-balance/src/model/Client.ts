export class Client {
    numberClient: number;
    address: string;
    name: string;

    constructor(numberClient: number, address: string, name: string) {
        this.numberClient = numberClient;
        this.address = address;
        this.name = name;
    }
}