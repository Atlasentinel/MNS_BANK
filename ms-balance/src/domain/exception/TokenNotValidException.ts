export class TokenNotValidException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TokenNotValidException";
    }
}
