type Account = {
    accountNumber: string;
    clientName: string;
    balance: number;
};

class Bank {
    private readonly accounts: Account[] = [];

    // Méthode pour ouvrir un compte
    openAccount(accountNumber: string, clientName: string, initialDeposit: number = 0) {
        this.accounts.push({ accountNumber, clientName, balance: initialDeposit });
    }

    // Méthode pour retirer de l'argent 
    withdrawal(accountNumber: string, clientName: string, amount: number): void {
        const account = this.accounts.find(
            acc => acc.accountNumber === accountNumber && acc.clientName === clientName
        );
        //gestion des erreurs
        if (!account) {
            throw new Error("Compte ou nom client incorrect.");
        }
        if (account.balance < amount) {
            throw new Error("Solde insuffisant.");
        }
        account.balance -= amount;
    }

    // Méthode pour déposer de l'argent
    deposit(accountNumber: string, clientName: string, amount: number): void {
        const account = this.accounts.find(
            acc => acc.accountNumber === accountNumber && acc.clientName === clientName
        );
        if (!account) {
            throw new Error("Compte ou nom client incorrect.");
        }
        account.balance += amount;
    }

    // Méthode pour obtenir le solde d'un compte
    getBalance(accountNumber: string, clientName: string): number {
        const account = this.accounts.find(
            acc => acc.accountNumber === accountNumber && acc.clientName === clientName
        );
        if (!account) {
            throw new Error("Compte ou nom client incorrect.");
        }
        return account.balance;
    }

    // Méthode pour convertir des montants entre Euro et USD
    conversionFromEuro(amount: number): number {
        const conversionRate = 1.18; // Example conversion rate from Euro to USD
        return amount * conversionRate;
    }

    // Méthode pour convertir des montants entre USD et Euro
    conversionToEuro(amount: number): number {
        const conversionRate = 1.18; // Example conversion rate from USD to Euro
        return amount / conversionRate;
    }
}

export { Bank, Account };