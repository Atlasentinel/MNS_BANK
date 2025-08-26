export interface CheckTokenUseCase {
  CheckToken(clientId: number, token: string): Promise<boolean>;
}