export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

export interface Transaction {
  id: string;
  categoryId: string;
  amount: number;
  createdAt: string;
}