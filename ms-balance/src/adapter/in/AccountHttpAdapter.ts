import { TokenNotValidException } from '../../domain/exception/TokenNotValidException';
import { CheckBalanceUseCase } from '../../port/in/CheckBalanceUseCase';
import { CheckTokenUseCase } from '../../port/in/CheckTokenUseCase';
import { Request, Response } from 'express';

// L'adaptateur d'entrée utilise le port d'entrée, il n'importe pas le service !!!
export class AccountHttpAdapter {
  constructor(private readonly checkBalanceUseCase: CheckBalanceUseCase, private readonly checkTokenUseCase: CheckTokenUseCase) {}

  public async handleCheckBalanceRequest(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const token = req.params.token;

    try {
        const isValid = await this.checkTokenUseCase.CheckToken(id, token);
        if (!isValid) {
          throw new TokenNotValidException('Invalid token');
        }

        const balance = await this.checkBalanceUseCase.getBalance(id);
        res.status(200).json({ balance });
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      res.status(404).send(errorMessage);
    }
  }
}
