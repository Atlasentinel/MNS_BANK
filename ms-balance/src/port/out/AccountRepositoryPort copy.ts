export interface ClientRepositoryPort {

    checkToken(clientId: number, token: string): Promise<boolean>;
}
