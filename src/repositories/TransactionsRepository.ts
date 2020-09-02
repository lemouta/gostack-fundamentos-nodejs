import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (balance: Balance, transaction: Transaction) => {
        const newBalance = balance;
        newBalance[transaction.type] += transaction.value;
        newBalance.total = newBalance.income - newBalance.outcome;
        return newBalance;
      },
      {
        income: 0.0,
        outcome: 0.0,
        total: 0.0,
      },
    );
  }

  public create({ title, type, value }: CreateDto): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
