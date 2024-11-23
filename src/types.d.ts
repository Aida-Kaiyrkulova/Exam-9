export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  createdAt: string;
}
