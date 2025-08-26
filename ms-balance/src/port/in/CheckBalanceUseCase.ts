export interface CheckBalanceUseCase {
  getBalance(clientId: number): Promise<number>;
}