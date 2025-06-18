type Account = {
    accountNumber: string;
    clientName: string;
    balance: number;
};

class Bank {
    private readonly accounts: Account[] = [];

    openAccount(accountNumber: string, clientName: string, initialDeposit: number = 0) {
        this.accounts.push({ accountNumber, clientName, balance: initialDeposit });
    }

    withdrawal(accountNumber: string, clientName: string, amount: number): void {
        const account = this.accounts.find(
            acc => acc.accountNumber === accountNumber && acc.clientName === clientName
        );
        if (!account) {
            throw new Error("Compte ou nom client incorrect.");
        }
        if (account.balance < amount) {
            throw new Error("Solde insuffisant.");
        }
        account.balance -= amount;
    }

    deposit(accountNumber: string, clientName: string, amount: number): void {
        const account = this.accounts.find(
            acc => acc.accountNumber === accountNumber && acc.clientName === clientName
        );
        if (!account) {
            throw new Error("Compte ou nom client incorrect.");
        }
        account.balance += amount;
    }

    getBalance(accountNumber: string, clientName: string): number {
        const account = this.accounts.find(
            acc => acc.accountNumber === accountNumber && acc.clientName === clientName
        );
        if (!account) {
            throw new Error("Compte ou nom client incorrect.");
        }
        return account.balance;
    }
    conversionFromEuro(amount: number): number {
        const conversionRate = 1.18; // Example conversion rate from Euro to USD
        return amount * conversionRate;
    }
    conversionToEuro(amount: number): number {
        const conversionRate = 1.18; // Example conversion rate from USD to Euro
        return amount / conversionRate;
    }
}

export { Bank, Account };