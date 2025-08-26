import axios from "axios";
import { AccountNotFoundException } from "../../domain/exception/AccountNotFoundException";
import { ClientRepositoryPort } from "../../port/out/AccountRepositoryPort copy";

export class ClientRepositoryAdapter implements ClientRepositoryPort {

    public async checkToken(clientId: number, token: string): Promise<boolean> {
        const body = {
            id: clientId,
            token: token,
        }
        const gatewayCheck = await axios.post('http://api-gateway:3100/auth/checktoken', body);

        if (!gatewayCheck.data || gatewayCheck.data !== true) {
            return false;
        }
        return true;
    }
}
