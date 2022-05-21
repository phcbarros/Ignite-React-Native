export interface Type {
  type: 'up' | 'down'
}

export enum TransactionsType {
  up = 'up',
  down = 'down',
}
export interface Transaction {
  id: string
  name: string | undefined
  amount: string | undefined
  transactionType: string
  category: string
  date: Date
}
