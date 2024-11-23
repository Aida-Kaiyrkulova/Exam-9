import React, { useState, useEffect } from "react";
import { Transaction } from "../../types";
import { useAppDispatch } from "../../app/hooks.ts";
import {
  addTransaction,
  editTransaction,
} from "../../store/thunks/transactionThunks.ts";
import "../../App.css";

interface TransactionFormProps {
  transactionToEdit: Transaction | null;
  closeModal: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  transactionToEdit,
  closeModal,
}) => {
  const dispatch = useAppDispatch();

  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (transactionToEdit) {
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category);
      setAmount(transactionToEdit.amount);
    }
  }, [transactionToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    if (transactionToEdit) {
      dispatch(
        editTransaction({
          id: transactionToEdit.id,
          amount,
          category,
          type,
        }),
      );
    } else {
      dispatch(
        addTransaction({
          amount,
          category,
          type,
        }),
      );
    }

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <button className="btn" type="submit">
          {transactionToEdit ? "Edit" : "Add"} Transaction
        </button>
        <button className="btn" type="button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
