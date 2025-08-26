import { AccountNotFoundException } from "../exception/AccountNotFoundException";
import { CheckTokenUseCase } from "../../port/in/CheckTokenUseCase";
import { ClientRepositoryPort } from "../../port/out/AccountRepositoryPort copy";
import { TokenNotValidException } from "../exception/TokenNotValidException";


export default class TokenService implements CheckTokenUseCase {
    
    constructor(private clientRepo: ClientRepositoryPort) {}

    public async CheckToken(clientId: number, token: string): Promise<boolean> {
        try {
            const isValid = await this.clientRepo.checkToken(clientId, token);
            return isValid;
        } catch {
            throw new TokenNotValidException(`Token not valid for client id ${clientId}`);
        }
    }
}

        

