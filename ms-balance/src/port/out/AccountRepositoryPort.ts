export interface AccountRepositoryPort {

    getBalance(clientId: number): Promise<number>;
}
