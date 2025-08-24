export class Client {
    id: number;
    name: string;
    login: string;
    password: string;
    token?: string|null;

    constructor(id: number, name: string, email: string, password: string, token?: string) {
        this.id = id;
        this.name = name;
        this.login = email;
        this.password = password;
        this.token = token;
    }
}